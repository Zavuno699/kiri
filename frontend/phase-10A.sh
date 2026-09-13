#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10A"
echo "FRONTEND CONSOLIDATION + INTEGRATION CHECKPOINT"
echo "============================================================"
echo "PWD: $PWD"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP_DIR=".phase-10A-backup-$STAMP"
BUILD_LOG=".phase-10A-build-$STAMP.log"

mkdir -p "$BACKUP_DIR"

cleanup_on_failure() {
  echo
  echo "PHASE 10A encountered an error."
  echo "Backup directory: $BACKUP_DIR"
  echo "Build log: $BUILD_LOG"
}
trap cleanup_on_failure ERR

# ============================================================
# PRE-FLIGHT
# ============================================================

echo "PRE-FLIGHT"
echo "------------------------------------------------------------"

if [[ ! -f package.json ]]; then
  echo "ERROR: package.json not found"
  exit 1
fi

mkdir -p \
  src/application/integration \
  src/application/facades \
  src/application/orchestration \
  src/application/runtime \
  src/application/navigation \
  src/features/dashboard/integration \
  src/features/property/integration \
  src/features/lease/integration \
  src/features/payment/integration \
  src/features/device/integration \
  src/features/lock/integration \
  src/features/security/integration \
  src/components/workspace

echo "Current source files: $(find src -type f | wc -l)"
echo

# ============================================================
# SAFE BACKUP OF KEY EXISTING FILES
# ============================================================

for f in \
  src/routes/router.tsx \
  src/routes/applicationRoutes.tsx \
  src/routes/routeMap.ts \
  src/application/navigation/operatorMenu.ts \
  src/application/index.ts \
  src/App.tsx \
  src/main.tsx \
  src/components/layout/AppShell.tsx
do
  if [[ -f "$f" ]]; then
    mkdir -p "$BACKUP_DIR/$(dirname "$f")"
    cp "$f" "$BACKUP_DIR/$f"
    echo "Backed up: $f"
  fi
done

echo

# ============================================================
# APPLICATION INTEGRATION CONTRACTS
# ============================================================

cat > src/application/integration/domainRuntime.ts <<'EOF'
export interface DomainRuntime {
  readonly domain: string
  readonly available: boolean
  readonly degraded: boolean
  readonly reason?: string
}

export function createDomainRuntime(
  domain: string,
  available: boolean,
  reason?: string,
): DomainRuntime {
  return {
    domain,
    available,
    degraded: !available,
    reason,
  }
}
EOF

cat > src/application/integration/domainCapability.ts <<'EOF'
export interface DomainCapability {
  id: string
  label: string
  enabled: boolean
  verified: boolean
  reason?: string
}

export function createDomainCapability(
  id: string,
  label: string,
  enabled: boolean,
  verified: boolean,
  reason?: string,
): DomainCapability {
  return {
    id,
    label,
    enabled,
    verified,
    reason,
  }
}
EOF

cat > src/application/integration/runtimeContract.ts <<'EOF'
export interface RuntimeContract {
  environment: string
  apiBaseUrl: string
  authenticated: boolean
  productionSafe: boolean
}

export function evaluateRuntimeContract(
  input: RuntimeContract,
): RuntimeContract {
  return {
    ...input,
    productionSafe:
      input.productionSafe &&
      input.environment.length > 0 &&
      input.apiBaseUrl.length > 0,
  }
}
EOF

cat > src/application/integration/featureAvailability.ts <<'EOF'
export interface FeatureAvailability {
  dashboard: boolean
  property: boolean
  lease: boolean
  payment: boolean
  device: boolean
  lock: boolean
  security: boolean
}

export const unavailableProductionFeatures = {
  deviceCollection: true,
  lockPublicIngress: true,
  securityPublicIngress: true,
} as const
EOF

# ============================================================
# APPLICATION FACADES
# ============================================================

cat > src/application/facades/dashboardFacade.ts <<'EOF'
import { createDashboardQuery } from "../../features/dashboard/queries/dashboardQuery"

export interface DashboardFacade {
  load(window?: "hour" | "day" | "week" | "month"): Promise<unknown>
}

export function createDashboardFacade(
  query: (input: unknown) => Promise<unknown>,
): DashboardFacade {
  return {
    load(window = "day") {
      return query(createDashboardQuery(window))
    },
  }
}
EOF

cat > src/application/facades/propertyFacade.ts <<'EOF'
export interface PropertyFacade {
  list(filters?: unknown): Promise<unknown>
  get(id: string): Promise<unknown>
}

export function createPropertyFacade(
  list: (filters?: unknown) => Promise<unknown>,
  get: (id: string) => Promise<unknown>,
): PropertyFacade {
  return { list, get }
}
EOF

cat > src/application/facades/leaseFacade.ts <<'EOF'
export interface LeaseFacade {
  list(filters?: unknown): Promise<unknown>
  get(id: string): Promise<unknown>
}

export function createLeaseFacade(
  list: (filters?: unknown) => Promise<unknown>,
  get: (id: string) => Promise<unknown>,
): LeaseFacade {
  return { list, get }
}
EOF

cat > src/application/facades/paymentFacade.ts <<'EOF'
export interface PaymentFacade {
  list(filters?: unknown): Promise<unknown>
  get(id: string): Promise<unknown>
  reconcile(id: string, reason: string): Promise<unknown>
}

export function createPaymentFacade(
  list: (filters?: unknown) => Promise<unknown>,
  get: (id: string) => Promise<unknown>,
  reconcile: (id: string, reason: string) => Promise<unknown>,
): PaymentFacade {
  return { list, get, reconcile }
}
EOF

cat > src/application/facades/deviceFacade.ts <<'EOF'
export interface DeviceFacade {
  get(id: string): Promise<unknown>
  command(input: unknown): Promise<unknown>
}

export function createDeviceFacade(
  get: (id: string) => Promise<unknown>,
  command: (input: unknown) => Promise<unknown>,
): DeviceFacade {
  return { get, command }
}
EOF

cat > src/application/facades/lockFacade.ts <<'EOF'
export interface LockFacade {
  list(): Promise<never>
  get(id: string): Promise<never>
  command(input: unknown): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Lock HTTP ingress is not verified in the production backend.",
  )
}

export function createLockFacade(): LockFacade {
  return {
    list: async () => unavailable(),
    get: async () => unavailable(),
    command: async () => unavailable(),
  }
}
EOF

cat > src/application/facades/securityFacade.ts <<'EOF'
export interface SecurityFacade {
  summary(): Promise<never>
  credentials(): Promise<never>
  access(): Promise<never>
  events(): Promise<never>
}

function unavailable(): never {
  throw new Error(
    "Security HTTP ingress is not verified in the production backend.",
  )
}

export function createSecurityFacade(): SecurityFacade {
  return {
    summary: async () => unavailable(),
    credentials: async () => unavailable(),
    access: async () => unavailable(),
    events: async () => unavailable(),
  }
}
EOF

# ============================================================
# ORCHESTRATION
# ============================================================

cat > src/application/orchestration/operatorOrchestrator.ts <<'EOF'
export interface OperatorOrchestrator {
  refreshAll(): Promise<void>
}

export function createOperatorOrchestrator(
  refreshers: Array<() => Promise<unknown>>,
): OperatorOrchestrator {
  return {
    async refreshAll() {
      for (const refresh of refreshers) {
        try {
          await refresh()
        } catch {
          // Individual domains remain fail-closed;
          // one degraded domain must not erase other state.
        }
      }
    },
  }
}
EOF

cat > src/application/orchestration/commandOrchestrator.ts <<'EOF'
export interface CommandOrchestrator {
  dispatch(
    type: string,
    payload: unknown,
  ): Promise<unknown>
}

export function createCommandOrchestrator(
  dispatch: (
    type: string,
    payload: unknown,
  ) => Promise<unknown>,
): CommandOrchestrator {
  return { dispatch }
}
EOF

cat > src/application/orchestration/queryOrchestrator.ts <<'EOF'
export interface QueryOrchestrator {
  execute(
    type: string,
    payload: unknown,
  ): Promise<unknown>
}

export function createQueryOrchestrator(
  execute: (
    type: string,
    payload: unknown,
  ) => Promise<unknown>,
): QueryOrchestrator {
  return { execute }
}
EOF

cat > src/application/orchestration/domainOrchestrator.ts <<'EOF'
export interface DomainOrchestrator {
  readonly domain: string
  readonly refresh?: () => Promise<unknown>
  readonly inspect?: (id: string) => Promise<unknown>
}

export function createDomainOrchestrator(
  domain: string,
  refresh?: () => Promise<unknown>,
  inspect?: (id: string) => Promise<unknown>,
): DomainOrchestrator {
  return { domain, refresh, inspect }
}
EOF

# ============================================================
# RUNTIME INTEGRATION
# ============================================================

cat > src/application/runtime/operatorRuntimeState.ts <<'EOF'
export interface OperatorRuntimeState {
  environment: string
  connected: boolean
  degraded: boolean
  lastRefreshAt?: string
  correlationId?: string
}

export function initialOperatorRuntimeState(
  environment: string,
): OperatorRuntimeState {
  return {
    environment,
    connected: false,
    degraded: false,
  }
}
EOF

cat > src/application/runtime/runtimeHealthSnapshot.ts <<'EOF'
export interface RuntimeHealthSnapshot {
  api: "available" | "unavailable"
  dashboard: "available" | "unavailable"
  property: "available" | "unavailable"
  lease: "available" | "unavailable"
  payment: "available" | "unavailable"
  device: "available" | "unavailable"
  lock: "available" | "unavailable"
  security: "available" | "unavailable"
  checkedAt: string
}
EOF

cat > src/application/runtime/createRuntimeHealthSnapshot.ts <<'EOF'
import type { RuntimeHealthSnapshot } from "./runtimeHealthSnapshot"

export function createRuntimeHealthSnapshot(
  values: Omit<RuntimeHealthSnapshot, "checkedAt">,
): RuntimeHealthSnapshot {
  return {
    ...values,
    checkedAt: new Date().toISOString(),
  }
}
EOF

cat > src/application/runtime/runtimeCoordinator.ts <<'EOF'
export interface RuntimeCoordinator {
  start(): Promise<void>
  stop(): Promise<void>
}

export function createRuntimeCoordinator(
  onStart: () => Promise<void>,
  onStop: () => Promise<void>,
): RuntimeCoordinator {
  return {
    start: onStart,
    stop: onStop,
  }
}
EOF

# ============================================================
# NAVIGATION INTEGRATION
# ============================================================

cat > src/application/navigation/domainNavigation.ts <<'EOF'
export interface DomainNavigationItem {
  id: string
  label: string
  path: string
  verified: boolean
  operational: boolean
}

export const domainNavigation: DomainNavigationItem[] = [
  {
    id: "dashboard",
    label: "Operations",
    path: "/",
    verified: true,
    operational: true,
  },
  {
    id: "properties",
    label: "Properties",
    path: "/properties",
    verified: false,
    operational: true,
  },
  {
    id: "leases",
    label: "Leases",
    path: "/leases",
    verified: true,
    operational: true,
  },
  {
    id: "payments",
    label: "Payments",
    path: "/payments",
    verified: false,
    operational: true,
  },
  {
    id: "devices",
    label: "Devices",
    path: "/devices",
    verified: true,
    operational: true,
  },
  {
    id: "locks",
    label: "Locks",
    path: "/locks",
    verified: false,
    operational: false,
  },
  {
    id: "security",
    label: "Security",
    path: "/security",
    verified: false,
    operational: false,
  },
]
EOF

cat > src/application/navigation/navigationResolver.ts <<'EOF'
import {
  domainNavigation,
} from "./domainNavigation"

export function resolveNavigation(
  pathname: string,
) {
  return (
    domainNavigation.find(
      (item) => item.path === pathname,
    ) ?? null
  )
}
EOF

# ============================================================
# FEATURE INTEGRATION FILES
# ============================================================

cat > src/features/dashboard/integration/dashboardIntegration.ts <<'EOF'
import {
  presentDashboard,
} from "../presenters/dashboardPresenter"

export function integrateDashboard(
  raw: {
    serviceCount: number
    criticalAlertCount: number
    degradedServiceCount: number
  },
) {
  return presentDashboard(raw)
}
EOF

cat > src/features/property/integration/propertyIntegration.ts <<'EOF'
import {
  presentProperty,
} from "../presenters/propertyPresenter"

export function integrateProperty(
  raw: Parameters<typeof presentProperty>[0],
) {
  return presentProperty(raw)
}
EOF

cat > src/features/lease/integration/leaseIntegration.ts <<'EOF'
import {
  presentLease,
} from "../presenters/leasePresenter"

export function integrateLease(
  raw: Parameters<typeof presentLease>[0],
) {
  return presentLease(raw)
}
EOF

cat > src/features/payment/integration/paymentIntegration.ts <<'EOF'
import {
  presentPayment,
} from "../presenters/paymentPresenter"

export function integratePayment(
  raw: Parameters<typeof presentPayment>[0],
) {
  return presentPayment(raw)
}
EOF

cat > src/features/device/integration/deviceIntegration.ts <<'EOF'
import {
  presentDevice,
} from "../presenters/devicePresenter"

export function integrateDevice(
  raw: Parameters<typeof presentDevice>[0],
) {
  return presentDevice(raw)
}
EOF

cat > src/features/lock/integration/lockIntegration.ts <<'EOF'
import {
  presentLock,
} from "../presenters/lockPresenter"

export function integrateLock(
  raw: Parameters<typeof presentLock>[0],
) {
  return presentLock(raw)
}
EOF

cat > src/features/security/integration/securityIntegration.ts <<'EOF'
import {
  presentSecurity,
} from "../presenters/securityPresenter"

export function integrateSecurity(
  raw: Parameters<typeof presentSecurity>[0],
) {
  return presentSecurity(raw)
}
EOF

# ============================================================
# DOMAIN WORKSPACE SURFACES
# ============================================================

cat > src/components/workspace/DomainWorkspaceHeader.tsx <<'EOF'
export function DomainWorkspaceHeader({
  eyebrow,
  title,
  detail,
}: {
  eyebrow: string
  title: string
  detail?: string
}) {
  return (
    <div className="mb-6">
      <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-kiri-blue-400">
        {eyebrow}
      </div>

      <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
        <h1 className="text-2xl font-black tracking-tight text-kiri-text">
          {title}
        </h1>

        {detail ? (
          <div className="text-xs text-kiri-text-muted">
            {detail}
          </div>
        ) : null}
      </div>
    </div>
  )
}
EOF

cat > src/components/workspace/DomainWorkspaceGrid.tsx <<'EOF'
import type { ReactNode } from "react"

export function DomainWorkspaceGrid({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      {children}
    </div>
  )
}
EOF

cat > src/components/workspace/DomainWorkspacePanel.tsx <<'EOF'
import type { ReactNode } from "react"

export function DomainWorkspacePanel({
  className = "",
  children,
}: {
  className?: string
  children: ReactNode
}) {
  return (
    <section
      className={`rounded-2xl border border-white/7 bg-kiri-950/60 p-5 shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${className}`}
    >
      {children}
    </section>
  )
}
EOF

# ============================================================
# SAFE INDEX EXTENSIONS
# ============================================================

append_export() {
  local file="$1"
  local line="$2"

  if [[ -f "$file" ]]; then
    if ! grep -Fqx "$line" "$file" 2>/dev/null; then
      printf '\n%s\n' "$line" >> "$file"
    fi
  fi
}

append_export \
  src/application/facades/index.ts \
  'export * from "./dashboardFacade"'

append_export \
  src/application/facades/index.ts \
  'export * from "./propertyFacade"'

append_export \
  src/application/facades/index.ts \
  'export * from "./leaseFacade"'

append_export \
  src/application/facades/index.ts \
  'export * from "./paymentFacade"'

append_export \
  src/application/facades/index.ts \
  'export * from "./deviceFacade"'

append_export \
  src/application/facades/index.ts \
  'export * from "./lockFacade"'

append_export \
  src/application/facades/index.ts \
  'export * from "./securityFacade"'

append_export \
  src/application/integration/index.ts \
  'export * from "./domainRuntime"'

append_export \
  src/application/integration/index.ts \
  'export * from "./domainCapability"'

append_export \
  src/application/integration/index.ts \
  'export * from "./runtimeContract"'

append_export \
  src/application/runtime/index.ts \
  'export * from "./operatorRuntimeState"'

append_export \
  src/application/runtime/index.ts \
  'export * from "./runtimeHealthSnapshot"'

append_export \
  src/application/runtime/index.ts \
  'export * from "./createRuntimeHealthSnapshot"'

append_export \
  src/application/runtime/index.ts \
  'export * from "./runtimeCoordinator"'

# ============================================================
# DISCOVERY / CONSOLIDATION REPORT
# ============================================================

echo
echo "============================================================"
echo "CONSOLIDATION INVENTORY"
echo "============================================================"

echo "Total frontend source files:"
find src -type f | wc -l

echo
echo "TS/TSX files:"
find src \( -name "*.ts" -o -name "*.tsx" \) -type f | wc -l

echo
echo "Feature files:"
for feature in dashboard property lease payment device lock security
do
  printf "%-12s " "$feature"
  find "src/features/$feature" -type f 2>/dev/null | wc -l
done

echo
echo "Potential duplicate TypeScript basenames:"
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -printf "%f\n" \
  | sort | uniq -d | head -50 || true

echo
echo "Router candidates:"
find src/routes -maxdepth 2 -type f \( -name "*router*.ts" -o -name "*router*.tsx" -o -name "*Routes*.ts" -o -name "*Routes*.tsx" \) 2>/dev/null | sort || true

echo
echo "============================================================"
echo "FIRST BUILD CHECKPOINT"
echo "============================================================"

set +e
npm run build 2>&1 | tee "$BUILD_LOG"
BUILD_STATUS=${PIPESTATUS[0]}
set -e

if [[ "$BUILD_STATUS" -ne 0 ]]; then
  echo
  echo "============================================================"
  echo "PHASE 10A BUILD FAILED"
  echo "============================================================"
  echo "Exit code: $BUILD_STATUS"
  echo "Build log: $BUILD_LOG"
  echo "Changes were NOT automatically rolled back."
  echo "This is checkpoint 1; inspect the concrete compiler errors before making another patch."
  exit "$BUILD_STATUS"
fi

echo
echo "============================================================"
echo "PHASE 10A COMPLETE"
echo "============================================================"
echo "Build: PASS"
echo "Tests: NOT CREATED"
echo "Source files: $(find src -type f | wc -l)"
echo "Backup: $BACKUP_DIR"
echo "Build log: $BUILD_LOG"
echo "============================================================"

echo
echo "PHASE 10A STATUS: COMPLETE"
echo "NEXT PHASE: 10B"
echo "============================================================"
