#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10C"
echo "FRONTEND REALIZATION LAYER + UI/WORKFLOW COMPOSITION"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10C-backup-$STAMP"

mkdir -p \
  "$BACKUP" \
  src/components/realization \
  src/components/operations \
  src/components/workspace \
  src/application/realization \
  src/application/composition \
  src/application/commands \
  src/application/queries \
  src/application/events \
  src/application/selectors \
  src/application/state \
  src/features/dashboard/realization \
  src/features/dashboard/presentation \
  src/features/properties/realization \
  src/features/properties/presentation \
  src/features/leases/realization \
  src/features/leases/presentation \
  src/features/payments/realization \
  src/features/payments/presentation \
  src/features/devices/realization \
  src/features/devices/presentation \
  src/features/locks/realization \
  src/features/locks/presentation \
  src/features/security/realization \
  src/features/security/presentation

# ============================================================
# REALIZATION CONTRACTS
# ============================================================

cat > src/application/realization/realizationState.ts <<'EOF'
export type RealizationPhase =
  | "idle"
  | "loading"
  | "ready"
  | "refreshing"
  | "degraded"
  | "blocked"
  | "error"

export interface RealizationState<T> {
  phase: RealizationPhase
  data?: T
  message?: string
  updatedAt?: string
}

export function idleRealization<T>(): RealizationState<T> {
  return {
    phase: "idle",
  }
}
EOF

cat > src/application/realization/realizationResult.ts <<'EOF'
export interface RealizationResult<T> {
  ok: boolean
  value?: T
  message?: string
  correlationId?: string
}

export function success<T>(
  value: T,
  correlationId?: string,
): RealizationResult<T> {
  return {
    ok: true,
    value,
    correlationId,
  }
}

export function failure<T = never>(
  message: string,
  correlationId?: string,
): RealizationResult<T> {
  return {
    ok: false,
    message,
    correlationId,
  }
}
EOF

cat > src/application/realization/realizationContext.ts <<'EOF'
export interface RealizationContext {
  correlationId: string
  operatorId?: string
  domain: string
  subjectId?: string
  readOnly: boolean
}

export function createRealizationContext(
  domain: string,
  subjectId?: string,
): RealizationContext {
  return {
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    domain,
    subjectId,
    readOnly: true,
  }
}
EOF

cat > src/application/realization/realizationPolicy.ts <<'EOF'
export interface RealizationPolicy {
  canRead: boolean
  canRefresh: boolean
  canCommand: boolean
  canMutate: boolean
  reason?: string
}

export function readOnlyPolicy(
  reason?: string,
): RealizationPolicy {
  return {
    canRead: true,
    canRefresh: true,
    canCommand: false,
    canMutate: false,
    reason,
  }
}
EOF

# ============================================================
# APPLICATION COMPOSITION
# ============================================================

cat > src/application/composition/applicationSurface.ts <<'EOF'
export interface ApplicationSurface {
  id: string
  label: string
  domain: string
  route: string
  enabled: boolean
  readOnly: boolean
}

export function createApplicationSurface(
  input: ApplicationSurface,
): ApplicationSurface {
  return { ...input }
}
EOF

cat > src/application/composition/surfaceRegistry.ts <<'EOF'
import type { ApplicationSurface } from "./applicationSurface"

export interface SurfaceRegistry {
  register(surface: ApplicationSurface): void
  get(id: string): ApplicationSurface | undefined
  list(): ApplicationSurface[]
}

export function createSurfaceRegistry(): SurfaceRegistry {
  const values = new Map<string, ApplicationSurface>()

  return {
    register(surface) {
      values.set(surface.id, surface)
    },

    get(id) {
      return values.get(id)
    },

    list() {
      return [...values.values()]
    },
  }
}
EOF

cat > src/application/composition/applicationSurfaceMap.ts <<'EOF'
import type { ApplicationSurface } from "./applicationSurface"

export const applicationSurfaceMap: ApplicationSurface[] = [
  {
    id: "dashboard",
    label: "Operations",
    domain: "dashboard",
    route: "/",
    enabled: true,
    readOnly: true,
  },
  {
    id: "properties",
    label: "Properties",
    domain: "property",
    route: "/properties",
    enabled: true,
    readOnly: true,
  },
  {
    id: "leases",
    label: "Leases",
    domain: "lease",
    route: "/leases",
    enabled: true,
    readOnly: true,
  },
  {
    id: "payments",
    label: "Payments",
    domain: "payment",
    route: "/payments",
    enabled: true,
    readOnly: true,
  },
  {
    id: "devices",
    label: "Devices",
    domain: "device",
    route: "/devices",
    enabled: true,
    readOnly: true,
  },
  {
    id: "locks",
    label: "Locks",
    domain: "lock",
    route: "/locks",
    enabled: false,
    readOnly: true,
  },
  {
    id: "security",
    label: "Security",
    domain: "security",
    route: "/security",
    enabled: false,
    readOnly: true,
  },
]
EOF

# ============================================================
# COMMAND / QUERY / EVENT REALIZATION
# ============================================================

cat > src/application/commands/operatorCommand.ts <<'EOF'
export interface OperatorCommand<T = unknown> {
  id: string
  type: string
  domain: string
  payload: T
  correlationId: string
  createdAt: string
}
EOF

cat > src/application/commands/createOperatorCommand.ts <<'EOF'
import type { OperatorCommand } from "./operatorCommand"

export function createOperatorCommand<T>(
  type: string,
  domain: string,
  payload: T,
): OperatorCommand<T> {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    type,
    domain,
    payload,
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    createdAt: new Date().toISOString(),
  }
}
EOF

cat > src/application/queries/operatorQuery.ts <<'EOF'
export interface OperatorQuery<T = unknown> {
  type: string
  domain: string
  params: T
  correlationId: string
  createdAt: string
}
EOF

cat > src/application/queries/createOperatorQuery.ts <<'EOF'
import type { OperatorQuery } from "./operatorQuery"

export function createOperatorQuery<T>(
  type: string,
  domain: string,
  params: T,
): OperatorQuery<T> {
  return {
    type,
    domain,
    params,
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    createdAt: new Date().toISOString(),
  }
}
EOF

cat > src/application/events/operatorEvent.ts <<'EOF'
export interface OperatorEvent<T = unknown> {
  id: string
  type: string
  domain: string
  payload: T
  occurredAt: string
  correlationId?: string
}
EOF

cat > src/application/events/createOperatorEvent.ts <<'EOF'
import type { OperatorEvent } from "./operatorEvent"

export function createOperatorEvent<T>(
  type: string,
  domain: string,
  payload: T,
  correlationId?: string,
): OperatorEvent<T> {
  return {
    id:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    type,
    domain,
    payload,
    occurredAt: new Date().toISOString(),
    correlationId,
  }
}
EOF

# ============================================================
# SELECTORS + STATE
# ============================================================

cat > src/application/selectors/select.ts <<'EOF'
export function select<T, R>(
  value: T,
  selector: (value: T) => R,
): R {
  return selector(value)
}
EOF

cat > src/application/selectors/composeSelectors.ts <<'EOF'
export function composeSelectors<T>(
  selectors: Array<(value: T) => unknown>,
) {
  return (value: T) =>
    selectors.map((selector) => selector(value))
}
EOF

cat > src/application/state/localState.ts <<'EOF'
export interface LocalState<T> {
  value: T
  version: number
  updatedAt: string
}

export function createLocalState<T>(
  value: T,
): LocalState<T> {
  return {
    value,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
EOF

cat > src/application/state/stateStore.ts <<'EOF'
import type { LocalState } from "./localState"

export interface StateStore<T> {
  get(): LocalState<T> | undefined
  set(value: T): LocalState<T>
  clear(): void
}

export function createStateStore<T>(): StateStore<T> {
  let state: LocalState<T> | undefined

  return {
    get() {
      return state
    },

    set(value) {
      state = {
        value,
        version: (state?.version ?? 0) + 1,
        updatedAt: new Date().toISOString(),
      }

      return state
    },

    clear() {
      state = undefined
    },
  }
}
EOF

# ============================================================
# SHARED REALIZATION UI
# ============================================================

cat > src/components/realization/RealizationStatus.tsx <<'EOF'
export function RealizationStatus({
  phase,
  message,
}: {
  phase:
    | "idle"
    | "loading"
    | "ready"
    | "refreshing"
    | "degraded"
    | "blocked"
    | "error"
  message?: string
}) {
  const label =
    phase === "ready"
      ? "Operational"
      : phase === "loading"
        ? "Loading"
        : phase === "refreshing"
          ? "Refreshing"
          : phase === "blocked"
            ? "Blocked"
            : phase === "degraded"
              ? "Degraded"
              : phase === "error"
                ? "Error"
                : "Idle"

  return (
    <div className="flex items-center gap-2 text-xs">
      <span
        className={[
          "h-2 w-2 rounded-full",
          phase === "ready" && "bg-kiri-green-400",
          phase === "loading" && "bg-kiri-blue-400",
          phase === "refreshing" && "bg-kiri-blue-400",
          phase === "degraded" && "bg-kiri-amber-400",
          phase === "blocked" && "bg-kiri-red-400",
          phase === "error" && "bg-kiri-red-400",
          phase === "idle" && "bg-kiri-text-muted",
        ]
          .filter(Boolean)
          .join(" ")}
      />

      <span className="font-medium text-kiri-text">
        {label}
      </span>

      {message ? (
        <span className="text-kiri-text-muted">
          {message}
        </span>
      ) : null}
    </div>
  )
}
EOF

cat > src/components/realization/RealizationPanel.tsx <<'EOF'
import type { ReactNode } from "react"

export function RealizationPanel({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: ReactNode
}) {
  return (
    <section className="rounded-2xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="mb-4">
        <div className="text-sm font-bold text-kiri-text">
          {title}
        </div>

        {description ? (
          <div className="mt-1 text-xs text-kiri-text-muted">
            {description}
          </div>
        ) : null}
      </div>

      {children}
    </section>
  )
}
EOF

cat > src/components/realization/RealizationEmpty.tsx <<'EOF'
export function RealizationEmpty({
  title,
  detail,
}: {
  title: string
  detail?: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-5 py-8 text-center">
      <div className="text-sm font-semibold text-kiri-text">
        {title}
      </div>

      {detail ? (
        <div className="mt-1 text-xs text-kiri-text-muted">
          {detail}
        </div>
      ) : null}
    </div>
  )
}
EOF

cat > src/components/realization/RealizationError.tsx <<'EOF'
export function RealizationError({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="rounded-xl border border-kiri-red-500/20 bg-kiri-red-500/5 px-5 py-4">
      <div className="text-sm font-semibold text-kiri-red-300">
        {title}
      </div>

      <div className="mt-1 text-xs text-kiri-text-muted">
        {detail}
      </div>
    </div>
  )
}
EOF

cat > src/components/operations/OperationMetadata.tsx <<'EOF'
export function OperationMetadata({
  domain,
  correlationId,
  updatedAt,
}: {
  domain: string
  correlationId?: string
  updatedAt?: string
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div>
        <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
          Domain
        </div>
        <div className="mt-1 text-xs font-semibold text-kiri-text">
          {domain}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
          Correlation
        </div>
        <div className="mt-1 truncate text-xs font-mono text-kiri-text">
          {correlationId ?? "—"}
        </div>
      </div>

      <div>
        <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
          Updated
        </div>
        <div className="mt-1 text-xs font-semibold text-kiri-text">
          {updatedAt ?? "—"}
        </div>
      </div>
    </div>
  )
}
EOF

# ============================================================
# DASHBOARD REALIZATION
# ============================================================

cat > src/features/dashboard/realization/dashboardRealization.ts <<'EOF'
import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import type {
  RealizationPolicy,
} from "../../../application/realization/realizationPolicy"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createDashboardRealization() {
  const context =
    createRealizationContext("dashboard")

  const policy: RealizationPolicy =
    readOnlyPolicy()

  return {
    context,
    policy,
  }
}
EOF

cat > src/features/dashboard/presentation/DashboardSurfaceModel.ts <<'EOF'
export interface DashboardSurfaceModel {
  title: string
  subtitle: string
  metrics: Array<{
    id: string
    label: string
    value: string | number
    state: "normal" | "warning" | "critical"
  }>
}
EOF

cat > src/features/dashboard/presentation/DashboardOperationalSummary.ts <<'EOF'
export interface DashboardOperationalSummary {
  services: number
  healthy: number
  degraded: number
  critical: number
  events: number
  commands: number
}
EOF

cat > src/features/dashboard/realization/dashboardSurfaceFactory.ts <<'EOF'
import type {
  DashboardSurfaceModel,
} from "../presentation/DashboardSurfaceModel"

export function createDashboardSurface(): DashboardSurfaceModel {
  return {
    title: "Operations",
    subtitle:
      "Live operational state across the KiriLock platform.",
    metrics: [],
  }
}
EOF

# ============================================================
# PROPERTY REALIZATION
# ============================================================

cat > src/features/properties/realization/propertyRealization.ts <<'EOF'
import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createPropertyRealization(
  propertyId?: string,
) {
  return {
    context: createRealizationContext(
      "property",
      propertyId,
    ),
    policy: readOnlyPolicy(),
  }
}
EOF

cat > src/features/properties/presentation/PropertySurfaceModel.ts <<'EOF'
export interface PropertySurfaceModel {
  id: string
  name: string
  status: string
  occupancy: string
  availableUnits: string
  totalUnits: string
}
EOF

cat > src/features/properties/presentation/PropertySummary.ts <<'EOF'
import type {
  OperationalProperty,
} from "../../../domain/contracts"

export function propertySummary(
  property: OperationalProperty,
) {
  return {
    id: property.id,
    name: property.name,
    status: property.status ?? "unknown",
    occupancy:
      property.occupancy === undefined
        ? "—"
        : `${property.occupancy.toFixed(1)}%`,
    availableUnits:
      property.availableUnits === undefined
        ? "—"
        : String(property.availableUnits),
    totalUnits:
      property.totalUnits === undefined
        ? "—"
        : String(property.totalUnits),
  }
}
EOF

cat > src/features/properties/realization/propertySurfaceFactory.ts <<'EOF'
import type {
  OperationalProperty,
} from "../../../domain/contracts"
import {
  propertySummary,
} from "../presentation/PropertySummary"

export function createPropertySurface(
  property?: OperationalProperty,
) {
  return property
    ? propertySummary(property)
    : undefined
}
EOF

# ============================================================
# LEASE REALIZATION
# ============================================================

cat > src/features/leases/realization/leaseRealization.ts <<'EOF'
import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createLeaseRealization(
  leaseId?: string,
) {
  return {
    context: createRealizationContext(
      "lease",
      leaseId,
    ),
    policy: readOnlyPolicy(),
  }
}
EOF

cat > src/features/leases/presentation/LeaseSurfaceModel.ts <<'EOF'
export interface LeaseSurfaceModel {
  id: string
  propertyId: string
  tenantId: string
  status: string
  startDate: string
  endDate: string
  amount: string
}
EOF

cat > src/features/leases/presentation/LeaseSummary.ts <<'EOF'
import type {
  OperationalLease,
} from "../../../domain/contracts"

export function leaseSummary(
  lease: OperationalLease,
) {
  return {
    id: lease.id,
    propertyId: lease.propertyId,
    tenantId: lease.tenantId ?? "—",
    status: lease.status ?? "unknown",
    startDate: lease.startDate ?? "—",
    endDate: lease.endDate ?? "—",
    amount:
      lease.amount === undefined
        ? "—"
        : String(lease.amount),
  }
}
EOF

cat > src/features/leases/realization/leaseSurfaceFactory.ts <<'EOF'
import type {
  OperationalLease,
} from "../../../domain/contracts"
import { leaseSummary } from "../presentation/LeaseSummary"

export function createLeaseSurface(
  lease?: OperationalLease,
) {
  return lease
    ? leaseSummary(lease)
    : undefined
}
EOF

# ============================================================
# PAYMENT REALIZATION
# ============================================================

cat > src/features/payments/realization/paymentRealization.ts <<'EOF'
import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createPaymentRealization(
  paymentId?: string,
) {
  return {
    context: createRealizationContext(
      "payment",
      paymentId,
    ),
    policy: readOnlyPolicy(),
  }
}
EOF

cat > src/features/payments/presentation/PaymentSurfaceModel.ts <<'EOF'
export interface PaymentSurfaceModel {
  id: string
  leaseId: string
  amount: string
  currency: string
  status: string
  reference: string
  settledAt: string
}
EOF

cat > src/features/payments/presentation/PaymentSummary.ts <<'EOF'
import type {
  OperationalPayment,
} from "../../../domain/contracts"

export function paymentSummary(
  payment: OperationalPayment,
) {
  return {
    id: payment.id,
    leaseId: payment.leaseId ?? "—",
    amount:
      payment.amount === undefined
        ? "—"
        : String(payment.amount),
    currency: payment.currency ?? "—",
    status: payment.status ?? "unknown",
    reference: payment.reference ?? "—",
    settledAt: payment.settledAt ?? "—",
  }
}
EOF

cat > src/features/payments/realization/paymentSurfaceFactory.ts <<'EOF'
import type {
  OperationalPayment,
} from "../../../domain/contracts"
import {
  paymentSummary,
} from "../presentation/PaymentSummary"

export function createPaymentSurface(
  payment?: OperationalPayment,
) {
  return payment
    ? paymentSummary(payment)
    : undefined
}
EOF

# ============================================================
# DEVICE REALIZATION
# ============================================================

cat > src/features/devices/realization/deviceRealization.ts <<'EOF'
import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createDeviceRealization(
  deviceId?: string,
) {
  return {
    context: createRealizationContext(
      "device",
      deviceId,
    ),
    policy: readOnlyPolicy(
      "Device commands require verified production ingress and authorization.",
    ),
  }
}
EOF

cat > src/features/devices/presentation/DeviceSurfaceModel.ts <<'EOF'
export interface DeviceSurfaceModel {
  id: string
  propertyId: string
  leaseId: string
  status: string
  online: string
  firmwareVersion: string
  lastSeenAt: string
}
EOF

cat > src/features/devices/presentation/DeviceSummary.ts <<'EOF'
import type {
  OperationalDevice,
} from "../../../domain/contracts"

export function deviceSummary(
  device: OperationalDevice,
) {
  return {
    id: device.id,
    propertyId: device.propertyId ?? "—",
    leaseId: device.leaseId ?? "—",
    status: device.status ?? "unknown",
    online:
      device.online === undefined
        ? "unknown"
        : device.online
          ? "online"
          : "offline",
    firmwareVersion:
      device.firmwareVersion ?? "—",
    lastSeenAt:
      device.lastSeenAt ?? "—",
  }
}
EOF

cat > src/features/devices/realization/deviceSurfaceFactory.ts <<'EOF'
import type {
  OperationalDevice,
} from "../../../domain/contracts"
import {
  deviceSummary,
} from "../presentation/DeviceSummary"

export function createDeviceSurface(
  device?: OperationalDevice,
) {
  return device
    ? deviceSummary(device)
    : undefined
}
EOF

# ============================================================
# LOCK REALIZATION
# ============================================================

cat > src/features/locks/realization/lockRealization.ts <<'EOF'
import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createLockRealization(
  lockId?: string,
) {
  return {
    context: createRealizationContext(
      "lock",
      lockId,
    ),
    policy: readOnlyPolicy(
      "Lock ingress is not verified for production HTTP use.",
    ),
  }
}
EOF

cat > src/features/locks/presentation/LockSurfaceModel.ts <<'EOF'
export interface LockSurfaceModel {
  id: string
  deviceId: string
  propertyId: string
  status: string
  locked: string
  mode: string
  lastCommandAt: string
}
EOF

cat > src/features/locks/presentation/LockSummary.ts <<'EOF'
import type {
  OperationalLock,
} from "../../../domain/contracts"

export function lockSummary(
  lock: OperationalLock,
) {
  return {
    id: lock.id,
    deviceId: lock.deviceId ?? "—",
    propertyId: lock.propertyId ?? "—",
    status: lock.status ?? "unknown",
    locked:
      lock.locked === undefined
        ? "unknown"
        : lock.locked
          ? "locked"
          : "unlocked",
    mode: lock.mode ?? "—",
    lastCommandAt:
      lock.lastCommandAt ?? "—",
  }
}
EOF

cat > src/features/locks/realization/lockSurfaceFactory.ts <<'EOF'
import type {
  OperationalLock,
} from "../../../domain/contracts"
import { lockSummary } from "../presentation/LockSummary"

export function createLockSurface(
  lock?: OperationalLock,
) {
  return lock
    ? lockSummary(lock)
    : undefined
}
EOF

# ============================================================
# SECURITY REALIZATION
# ============================================================

cat > src/features/security/realization/securityRealization.ts <<'EOF'
import {
  createRealizationContext,
} from "../../../application/realization/realizationContext"
import {
  readOnlyPolicy,
} from "../../../application/realization/realizationPolicy"

export function createSecurityRealization(
  subjectId?: string,
) {
  return {
    context: createRealizationContext(
      "security",
      subjectId,
    ),
    policy: readOnlyPolicy(
      "Security ingress is not verified for production HTTP use.",
    ),
  }
}
EOF

cat > src/features/security/presentation/SecuritySurfaceModel.ts <<'EOF'
export interface SecuritySurfaceModel {
  id: string
  subjectId: string
  status: string
  accessGranted: string
  restrictedAccess: string
  credentialState: string
  lastEventAt: string
}
EOF

cat > src/features/security/presentation/SecuritySummary.ts <<'EOF'
import type {
  OperationalSecurity,
} from "../../../domain/contracts"

export function securitySummary(
  security: OperationalSecurity,
) {
  return {
    id: security.id,
    subjectId:
      security.subjectId ?? "—",
    status:
      security.status ?? "unknown",
    accessGranted:
      security.accessGranted === undefined
        ? "unknown"
        : security.accessGranted
          ? "granted"
          : "denied",
    restrictedAccess:
      security.restrictedAccess === undefined
        ? "—"
        : String(security.restrictedAccess),
    credentialState:
      security.credentialState ?? "—",
    lastEventAt:
      security.lastEventAt ?? "—",
  }
}
EOF

cat > src/features/security/realization/securitySurfaceFactory.ts <<'EOF'
import type {
  OperationalSecurity,
} from "../../../domain/contracts"
import {
  securitySummary,
} from "../presentation/SecuritySummary"

export function createSecuritySurface(
  security?: OperationalSecurity,
) {
  return security
    ? securitySummary(security)
    : undefined
}
EOF

# ============================================================
# COMBINED OPERATOR SURFACE
# ============================================================

cat > src/components/workspace/operatorSurfaceModel.ts <<'EOF'
export interface OperatorSurfaceSection {
  id: string
  title: string
  domain: string
  visible: boolean
  priority: number
}

export const operatorSurfaceSections:
  OperatorSurfaceSection[] = [
    {
      id: "dashboard",
      title: "Operations",
      domain: "dashboard",
      visible: true,
      priority: 1,
    },
    {
      id: "properties",
      title: "Properties",
      domain: "property",
      visible: true,
      priority: 2,
    },
    {
      id: "leases",
      title: "Leases",
      domain: "lease",
      visible: true,
      priority: 3,
    },
    {
      id: "payments",
      title: "Payments",
      domain: "payment",
      visible: true,
      priority: 4,
    },
    {
      id: "devices",
      title: "Devices",
      domain: "device",
      visible: true,
      priority: 5,
    },
    {
      id: "locks",
      title: "Locks",
      domain: "lock",
      visible: false,
      priority: 6,
    },
    {
      id: "security",
      title: "Security",
      domain: "security",
      visible: false,
      priority: 7,
    },
  ]
EOF

# ============================================================
# INDEXES
# ============================================================

append_export() {
  local file="$1"
  local line="$2"

  if [[ -f "$file" ]] && ! grep -Fqx "$line" "$file" 2>/dev/null; then
    printf '\n%s\n' "$line" >> "$file"
  fi
}

append_export src/application/realization/index.ts \
  'export * from "./realizationState"'

append_export src/application/realization/index.ts \
  'export * from "./realizationResult"'

append_export src/application/realization/index.ts \
  'export * from "./realizationContext"'

append_export src/application/realization/index.ts \
  'export * from "./realizationPolicy"'

append_export src/application/composition/index.ts \
  'export * from "./applicationSurface"'

append_export src/application/composition/index.ts \
  'export * from "./surfaceRegistry"'

append_export src/application/composition/index.ts \
  'export * from "./applicationSurfaceMap"'

append_export src/application/commands/index.ts \
  'export * from "./operatorCommand"'

append_export src/application/commands/index.ts \
  'export * from "./createOperatorCommand"'

append_export src/application/queries/index.ts \
  'export * from "./operatorQuery"'

append_export src/application/queries/index.ts \
  'export * from "./createOperatorQuery"'

append_export src/application/events/index.ts \
  'export * from "./operatorEvent"'

append_export src/application/events/index.ts \
  'export * from "./createOperatorEvent"'

append_export src/application/selectors/index.ts \
  'export * from "./select"'

append_export src/application/selectors/index.ts \
  'export * from "./composeSelectors"'

append_export src/application/state/index.ts \
  'export * from "./localState"'

append_export src/application/state/index.ts \
  'export * from "./stateStore"'

echo
echo "============================================================"
echo "PHASE 10C COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "NEW REALIZATION FILES:"
printf "%-35s %s\n" "Application realization" \
  "$(find src/application/realization -type f | wc -l)"
printf "%-35s %s\n" "Application composition" \
  "$(find src/application/composition -type f | wc -l)"
printf "%-35s %s\n" "Commands" \
  "$(find src/application/commands -type f | wc -l)"
printf "%-35s %s\n" "Queries" \
  "$(find src/application/queries -type f | wc -l)"
printf "%-35s %s\n" "Events" \
  "$(find src/application/events -type f | wc -l)"
printf "%-35s %s\n" "Selectors" \
  "$(find src/application/selectors -type f | wc -l)"
printf "%-35s %s\n" "State" \
  "$(find src/application/state -type f | wc -l)"

echo
printf "%-35s %s\n" "Dashboard" \
  "$(find src/features/dashboard/realization src/features/dashboard/presentation -type f 2>/dev/null | wc -l)"
printf "%-35s %s\n" "Properties" \
  "$(find src/features/properties/realization src/features/properties/presentation -type f 2>/dev/null | wc -l)"
printf "%-35s %s\n" "Leases" \
  "$(find src/features/leases/realization src/features/leases/presentation -type f 2>/dev/null | wc -l)"
printf "%-35s %s\n" "Payments" \
  "$(find src/features/payments/realization src/features/payments/presentation -type f 2>/dev/null | wc -l)"
printf "%-35s %s\n" "Devices" \
  "$(find src/features/devices/realization src/features/devices/presentation -type f 2>/dev/null | wc -l)"
printf "%-35s %s\n" "Locks" \
  "$(find src/features/locks/realization src/features/locks/presentation -type f 2>/dev/null | wc -l)"
printf "%-35s %s\n" "Security" \
  "$(find src/features/security/realization src/features/security/presentation -type f 2>/dev/null | wc -l)"

echo
echo "Backup: $BACKUP"
echo
echo "============================================================"
echo "NEXT: PHASE 10D"
echo "FRONTEND DOMAIN WORKSPACES + COMMAND SURFACES"
echo "============================================================"
