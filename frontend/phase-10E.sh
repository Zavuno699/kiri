#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10E"
echo "CROSS-DOMAIN WORKSPACE COMPOSITION + RUNTIME REGISTRATION"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10E-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/composition" \
    "src/features/$domain/registration" \
    "src/features/$domain/context" \
    "src/features/$domain/navigation" \
    "src/features/$domain/persistence" \
    "src/features/$domain/projections" \
    "src/features/$domain/relationships" \
    "src/features/$domain/status" \
    "src/features/$domain/commands/handlers" \
    "src/features/$domain/queries/handlers"
done

mkdir -p \
  src/application/composition \
  src/application/registration \
  src/application/runtime \
  src/application/runtime/services \
  src/application/runtime/providers \
  src/application/runtime/features \
  src/application/navigation \
  src/application/state \
  src/application/context \
  src/application/integration \
  src/runtime \
  src/runtime/features \
  src/runtime/services \
  src/runtime/registries \
  src/runtime/providers \
  src/runtime/navigation \
  src/components/navigation \
  src/components/runtime \
  src/components/domain

# ============================================================
# APPLICATION COMPOSITION
# ============================================================

cat > src/application/composition/domainModule.ts <<'EOF'
export interface DomainModule {
  id: string
  label: string
  enabled: boolean
  readOnly: boolean
  initialize(): Promise<void>
  shutdown(): Promise<void>
}
EOF

cat > src/application/composition/domainModuleRegistry.ts <<'EOF'
import type { DomainModule } from "./domainModule"

export interface DomainModuleRegistry {
  register(module: DomainModule): void
  get(id: string): DomainModule | undefined
  list(): DomainModule[]
}

export function createDomainModuleRegistry(): DomainModuleRegistry {
  const modules = new Map<string, DomainModule>()

  return {
    register(module) {
      modules.set(module.id, module)
    },

    get(id) {
      return modules.get(id)
    },

    list() {
      return [...modules.values()]
    },
  }
}
EOF

cat > src/application/composition/applicationComposition.ts <<'EOF'
import type { DomainModule } from "./domainModule"

export interface ApplicationComposition {
  modules: DomainModule[]
  initialized: boolean
}
EOF

cat > src/application/composition/createApplicationComposition.ts <<'EOF'
import type { ApplicationComposition } from "./applicationComposition"
import type { DomainModule } from "./domainModule"

export function createApplicationComposition(
  modules: DomainModule[],
): ApplicationComposition {
  return {
    modules,
    initialized: false,
  }
}
EOF

cat > src/application/composition/composeDomains.ts <<'EOF'
import type { DomainModule } from "./domainModule"

export function composeDomains(
  modules: DomainModule[],
): DomainModule[] {
  return [...modules].sort((a, b) =>
    a.id.localeCompare(b.id),
  )
}
EOF

# ============================================================
# APPLICATION REGISTRATION
# ============================================================

cat > src/application/registration/registrationResult.ts <<'EOF'
export interface RegistrationResult {
  id: string
  registered: boolean
  reason?: string
}
EOF

cat > src/application/registration/registrationRegistry.ts <<'EOF'
import type { RegistrationResult } from "./registrationResult"

export interface RegistrationRegistry {
  register(result: RegistrationResult): void
  list(): RegistrationResult[]
  get(id: string): RegistrationResult | undefined
}

export function createRegistrationRegistry(): RegistrationRegistry {
  const values = new Map<string, RegistrationResult>()

  return {
    register(result) {
      values.set(result.id, result)
    },

    list() {
      return [...values.values()]
    },

    get(id) {
      return values.get(id)
    },
  }
}
EOF

cat > src/application/registration/registerCoreDomains.ts <<'EOF'
import type { RegistrationRegistry } from "./registrationRegistry"
import type { DomainModule } from "../composition/domainModule"

export function registerCoreDomains(
  registry: RegistrationRegistry,
  modules: DomainModule[],
): void {
  for (const module of modules) {
    registry.register({
      id: module.id,
      registered: true,
    })
  }
}
EOF

# ============================================================
# RUNTIME CORE
# ============================================================

cat > src/application/runtime/services/runtimeService.ts <<'EOF'
export interface RuntimeService {
  id: string
  start(): Promise<void>
  stop(): Promise<void>
}
EOF

cat > src/application/runtime/services/runtimeServiceRegistry.ts <<'EOF'
import type { RuntimeService } from "./runtimeService"

export interface RuntimeServiceRegistry {
  register(service: RuntimeService): void
  get(id: string): RuntimeService | undefined
  list(): RuntimeService[]
}

export function createRuntimeServiceRegistry(): RuntimeServiceRegistry {
  const services = new Map<string, RuntimeService>()

  return {
    register(service) {
      services.set(service.id, service)
    },

    get(id) {
      return services.get(id)
    },

    list() {
      return [...services.values()]
    },
  }
}
EOF

cat > src/application/runtime/runtimeLifecycle.ts <<'EOF'
import type { RuntimeService } from "./services/runtimeService"

export interface RuntimeLifecycle {
  start(): Promise<void>
  stop(): Promise<void>
}

export function createRuntimeLifecycle(
  services: RuntimeService[],
): RuntimeLifecycle {
  return {
    async start() {
      for (const service of services) {
        await service.start()
      }
    },

    async stop() {
      for (const service of [...services].reverse()) {
        await service.stop()
      }
    },
  }
}
EOF

cat > src/application/runtime/runtimeState.ts <<'EOF'
export interface RuntimeState {
  initialized: boolean
  started: boolean
  degraded: boolean
  reason?: string
  startedAt?: string
  stoppedAt?: string
}

export const initialRuntimeState: RuntimeState = {
  initialized: false,
  started: false,
  degraded: false,
}
EOF

cat > src/application/runtime/providers/runtimeProvider.ts <<'EOF'
export interface RuntimeProvider<T> {
  id: string
  create(): T
  dispose(value: T): void
}
EOF

cat > src/application/runtime/providers/providerRegistry.ts <<'EOF'
import type { RuntimeProvider } from "./runtimeProvider"

export interface ProviderRegistry {
  register<T>(provider: RuntimeProvider<T>): void
  list(): RuntimeProvider<unknown>[]
}

export function createProviderRegistry(): ProviderRegistry {
  const values: RuntimeProvider<unknown>[] = []

  return {
    register<T>(provider: RuntimeProvider<T>) {
      values.push(provider as RuntimeProvider<unknown>)
    },

    list() {
      return [...values]
    },
  }
}
EOF

# ============================================================
# RUNTIME FEATURE REGISTRATION
# ============================================================

cat > src/application/runtime/features/featureRuntime.ts <<'EOF'
export interface FeatureRuntime {
  id: string
  domain: string
  enabled: boolean
  readOnly: boolean
  initialized: boolean
}
EOF

cat > src/application/runtime/features/featureRuntimeRegistry.ts <<'EOF'
import type { FeatureRuntime } from "./featureRuntime"

export interface FeatureRuntimeRegistry {
  register(runtime: FeatureRuntime): void
  get(id: string): FeatureRuntime | undefined
  list(): FeatureRuntime[]
}

export function createFeatureRuntimeRegistry(): FeatureRuntimeRegistry {
  const values = new Map<string, FeatureRuntime>()

  return {
    register(runtime) {
      values.set(runtime.id, runtime)
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

cat > src/application/runtime/features/createFeatureRuntime.ts <<'EOF'
import type { FeatureRuntime } from "./featureRuntime"

export function createFeatureRuntime(
  id: string,
  domain: string,
  enabled = true,
  readOnly = true,
): FeatureRuntime {
  return {
    id,
    domain,
    enabled,
    readOnly,
    initialized: false,
  }
}
EOF

# ============================================================
# CONTEXT
# ============================================================

cat > src/application/context/operatorContext.ts <<'EOF'
export interface OperatorContext {
  operatorId?: string
  sessionId?: string
  tenantId?: string
  correlationId: string
  environment: string
  readOnly: boolean
}

export function createOperatorContext(
  environment: string,
): OperatorContext {
  return {
    correlationId:
      globalThis.crypto?.randomUUID?.() ??
      `${Date.now()}-${Math.random()}`,
    environment,
    readOnly: true,
  }
}
EOF

cat > src/application/context/domainContext.ts <<'EOF'
export interface DomainContext {
  domain: string
  entityId?: string
  correlationId: string
  readOnly: boolean
}
EOF

cat > src/application/context/contextStack.ts <<'EOF'
import type { DomainContext } from "./domainContext"

export interface ContextStack {
  push(value: DomainContext): void
  pop(): DomainContext | undefined
  current(): DomainContext | undefined
  list(): DomainContext[]
}

export function createContextStack(): ContextStack {
  const values: DomainContext[] = []

  return {
    push(value) {
      values.push(value)
    },

    pop() {
      return values.pop()
    },

    current() {
      return values[values.length - 1]
    },

    list() {
      return [...values]
    },
  }
}
EOF

# ============================================================
# NAVIGATION
# ============================================================

cat > src/application/navigation/navigationEntry.ts <<'EOF'
export interface NavigationEntry {
  id: string
  label: string
  path: string
  domain: string
  enabled: boolean
  order: number
}
EOF

cat > src/application/navigation/navigationRegistry.ts <<'EOF'
import type { NavigationEntry } from "./navigationEntry"

export interface NavigationRegistry {
  register(entry: NavigationEntry): void
  list(): NavigationEntry[]
  resolve(path: string): NavigationEntry | undefined
}

export function createNavigationRegistry(): NavigationRegistry {
  const values = new Map<string, NavigationEntry>()

  return {
    register(entry) {
      values.set(entry.id, entry)
    },

    list() {
      return [...values.values()].sort(
        (a, b) => a.order - b.order,
      )
    },

    resolve(path) {
      return [...values.values()].find(
        (entry) => entry.path === path,
      )
    },
  }
}
EOF

cat > src/components/navigation/RuntimeNavigation.tsx <<'EOF'
import { Link } from "react-router-dom"
import {
  applicationNavigation,
} from "../../runtime/navigation/applicationNavigation"

export function RuntimeNavigation() {
  return (
    <nav className="flex flex-wrap gap-2">
      {applicationNavigation
        .filter((item) => item.enabled)
        .map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="rounded-lg border border-white/7 px-3 py-2 text-xs font-semibold text-kiri-text-muted transition hover:border-kiri-blue-500/30 hover:text-kiri-text"
          >
            {item.label}
          </Link>
        ))}
    </nav>
  )
}
EOF

# ============================================================
# DOMAIN FACTORY GENERATOR
# ============================================================

make_domain_runtime() {
  local domain="$1"
  local singular="$2"
  local label="$3"

  cat > "src/features/$domain/composition/${singular}Module.ts" <<EOF
import type { DomainModule } from "../../../application/composition/domainModule"

export const ${singular}Module: DomainModule = {
  id: "${domain}",
  label: "${label}",
  enabled: ${domain/security/locks?false:true},
  readOnly: true,

  async initialize() {},

  async shutdown() {},
}
EOF

  # Repair shell interpolation issue for disabled modules.
  if [[ "$domain" == "locks" || "$domain" == "security" ]]; then
    sed -i 's/enabled: true/enabled: false/' \
      "src/features/$domain/composition/${singular}Module.ts"
  fi

  cat > "src/features/$domain/composition/${singular}Composition.ts" <<EOF
import type { DomainModule } from "../../../application/composition/domainModule"
import { ${singular}Module } from "./${singular}Module"

export interface ${singular^}Composition {
  module: DomainModule
  initialized: boolean
}

export function create${singular^}Composition(): ${singular^}Composition {
  return {
    module: ${singular}Module,
    initialized: false,
  }
}
EOF

  cat > "src/features/$domain/registration/${singular}Registration.ts" <<EOF
export interface ${singular^}Registration {
  id: "${domain}"
  registered: boolean
  readOnly: boolean
}

export const ${singular}Registration: ${singular^}Registration = {
  id: "${domain}",
  registered: true,
  readOnly: true,
}
EOF

  cat > "src/features/$domain/context/${singular}Context.ts" <<EOF
export interface ${singular^}Context {
  domain: "${domain}"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function create${singular^}Context(
  entityId?: string,
): ${singular^}Context {
  return {
    domain: "${domain}",
    entityId,
    readOnly: true,
  }
}
EOF

  cat > "src/features/$domain/navigation/${singular}Navigation.ts" <<EOF
export interface ${singular^}Navigation {
  label: string
  path: string
  enabled: boolean
}

export const ${singular}Navigation: ${singular^}Navigation = {
  label: "${label}",
  path: "/${domain}",
  enabled: ${domain/security/locks?false:true},
}
EOF

  if [[ "$domain" == "locks" || "$domain" == "security" ]]; then
    sed -i 's/enabled: true/enabled: false/' \
      "src/features/$domain/navigation/${singular}Navigation.ts"
  fi

  cat > "src/features/$domain/persistence/${singular}LocalProjection.ts" <<EOF
export interface ${singular^}LocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function create${singular^}LocalProjection(
  id: string,
): ${singular^}LocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
EOF

  cat > "src/features/$domain/projections/${singular}OperationalProjection.ts" <<EOF
export interface ${singular^}OperationalProjection {
  id: string
  status: string
  available: boolean
  degraded: boolean
  updatedAt: string
}
EOF

  cat > "src/features/$domain/relationships/${singular}Relationships.ts" <<EOF
export interface ${singular^}Relationship {
  domain: string
  id: string
  relation: string
  targetDomain: string
  targetId: string
}
EOF

  cat > "src/features/$domain/status/${singular}RuntimeStatus.ts" <<EOF
export interface ${singular^}RuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const ${singular}RuntimeStatus: ${singular^}RuntimeStatus = {
  available: ${domain/security/locks?false:true},
  degraded: ${domain/security/locks?true:false},
}
EOF

  if [[ "$domain" == "locks" || "$domain" == "security" ]]; then
    sed -i 's/available: true/available: false/' \
      "src/features/$domain/status/${singular}RuntimeStatus.ts"
    sed -i 's/degraded: false/degraded: true/' \
      "src/features/$domain/status/${singular}RuntimeStatus.ts"
  fi

  cat > "src/features/$domain/commands/handlers/${singular}RefreshHandler.ts" <<EOF
export interface ${singular^}RefreshHandler {
  execute(): Promise<void>
}

export function create${singular^}RefreshHandler(
  refresh: () => Promise<unknown>,
): ${singular^}RefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
EOF

  cat > "src/features/$domain/commands/handlers/${singular}InspectHandler.ts" <<EOF
export interface ${singular^}InspectHandler {
  execute(id: string): Promise<unknown>
}

export function create${singular^}InspectHandler(
  inspect: (id: string) => Promise<unknown>,
): ${singular^}InspectHandler {
  return {
    execute: inspect,
  }
}
EOF

  cat > "src/features/$domain/queries/handlers/${singular}ListHandler.ts" <<EOF
export interface ${singular^}ListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function create${singular^}ListHandler(
  query: (params?: unknown) => Promise<unknown>,
): ${singular^}ListHandler {
  return {
    execute: query,
  }
}
EOF

  cat > "src/features/$domain/queries/handlers/${singular}DetailsHandler.ts" <<EOF
export interface ${singular^}DetailsHandler {
  execute(id: string): Promise<unknown>
}

export function create${singular^}DetailsHandler(
  query: (id: string) => Promise<unknown>,
): ${singular^}DetailsHandler {
  return {
    execute: query,
  }
}
EOF
}

make_domain_runtime dashboard dashboard Dashboard
make_domain_runtime properties property Properties
make_domain_runtime leases lease Leases
make_domain_runtime payments payment Payments
make_domain_runtime devices device Devices
make_domain_runtime locks lock Locks
make_domain_runtime security security Security

# ============================================================
# CROSS-DOMAIN COMPOSITION
# ============================================================

cat > src/runtime/features/featureDefinition.ts <<'EOF'
export interface FeatureDefinition {
  id: string
  domain: string
  label: string
  route: string
  enabled: boolean
  readOnly: boolean
}
EOF

cat > src/runtime/features/featureDefinitions.ts <<'EOF'
import type { FeatureDefinition } from "./featureDefinition"

export const featureDefinitions: FeatureDefinition[] = [
  {
    id: "dashboard",
    domain: "dashboard",
    label: "Operations",
    route: "/",
    enabled: true,
    readOnly: true,
  },
  {
    id: "properties",
    domain: "property",
    label: "Properties",
    route: "/properties",
    enabled: true,
    readOnly: true,
  },
  {
    id: "leases",
    domain: "lease",
    label: "Leases",
    route: "/leases",
    enabled: true,
    readOnly: true,
  },
  {
    id: "payments",
    domain: "payment",
    label: "Payments",
    route: "/payments",
    enabled: true,
    readOnly: true,
  },
  {
    id: "devices",
    domain: "device",
    label: "Devices",
    route: "/devices",
    enabled: true,
    readOnly: true,
  },
  {
    id: "locks",
    domain: "lock",
    label: "Locks",
    route: "/locks",
    enabled: false,
    readOnly: true,
  },
  {
    id: "security",
    domain: "security",
    label: "Security",
    route: "/security",
    enabled: false,
    readOnly: true,
  },
]
EOF

cat > src/runtime/registries/runtimeFeatureRegistry.ts <<'EOF'
import type { FeatureDefinition } from "../features/featureDefinition"
import { featureDefinitions } from "../features/featureDefinitions"

export function createRuntimeFeatureRegistry(): Map<string, FeatureDefinition> {
  return new Map(
    featureDefinitions.map((feature) => [
      feature.id,
      feature,
    ]),
  )
}
EOF

cat > src/runtime/services/runtimeFeatureService.ts <<'EOF'
import {
  createRuntimeFeatureRegistry,
} from "../registries/runtimeFeatureRegistry"

export function getRuntimeFeature(
  id: string,
) {
  return createRuntimeFeatureRegistry().get(id)
}

export function listRuntimeFeatures() {
  return [...createRuntimeFeatureRegistry().values()]
}
EOF

# ============================================================
# NAVIGATION REGISTRY
# ============================================================

cat > src/runtime/navigation/applicationNavigation.ts <<'EOF'
export interface ApplicationNavigation {
  id: string
  label: string
  path: string
  enabled: boolean
  order: number
}

export const applicationNavigation: ApplicationNavigation[] = [
  {
    id: "dashboard",
    label: "Operations",
    path: "/",
    enabled: true,
    order: 1,
  },
  {
    id: "properties",
    label: "Properties",
    path: "/properties",
    enabled: true,
    order: 2,
  },
  {
    id: "leases",
    label: "Leases",
    path: "/leases",
    enabled: true,
    order: 3,
  },
  {
    id: "payments",
    label: "Payments",
    path: "/payments",
    enabled: true,
    order: 4,
  },
  {
    id: "devices",
    label: "Devices",
    path: "/devices",
    enabled: true,
    order: 5,
  },
  {
    id: "locks",
    label: "Locks",
    path: "/locks",
    enabled: false,
    order: 6,
  },
  {
    id: "security",
    label: "Security",
    path: "/security",
    enabled: false,
    order: 7,
  },
]
EOF

cat > src/runtime/navigation/resolveApplicationNavigation.ts <<'EOF'
import {
  applicationNavigation,
} from "./applicationNavigation"

export function resolveApplicationNavigation(
  path: string,
) {
  return applicationNavigation.find(
    (item) => item.path === path,
  )
}
EOF

# ============================================================
# RUNTIME SERVICES
# ============================================================

cat > src/runtime/services/navigationRuntimeService.ts <<'EOF'
import type { RuntimeService } from "../../application/runtime/services/runtimeService"

export const navigationRuntimeService: RuntimeService = {
  id: "navigation",

  async start() {},

  async stop() {},
}
EOF

cat > src/runtime/services/domainRuntimeService.ts <<'EOF'
import type { RuntimeService } from "../../application/runtime/services/runtimeService"

export const domainRuntimeService: RuntimeService = {
  id: "domains",

  async start() {},

  async stop() {},
}
EOF

cat > src/runtime/services/stateRuntimeService.ts <<'EOF'
import type { RuntimeService } from "../../application/runtime/services/runtimeService"

export const stateRuntimeService: RuntimeService = {
  id: "state",

  async start() {},

  async stop() {},
}
EOF

# ============================================================
# RUNTIME PROVIDERS
# ============================================================

cat > src/runtime/providers/applicationProvider.ts <<'EOF'
export interface ApplicationProvider {
  id: "application"
  ready: boolean
}

export const applicationProvider: ApplicationProvider = {
  id: "application",
  ready: false,
}
EOF

cat > src/runtime/providers/domainProvider.ts <<'EOF'
export interface DomainProvider {
  id: "domain"
  ready: boolean
}

export const domainProvider: DomainProvider = {
  id: "domain",
  ready: false,
}
EOF

cat > src/runtime/providers/navigationProvider.ts <<'EOF'
export interface NavigationProvider {
  id: "navigation"
  ready: boolean
}

export const navigationProvider: NavigationProvider = {
  id: "navigation",
  ready: false,
}
EOF

# ============================================================
# CROSS-DOMAIN RELATIONSHIP MAPS
# ============================================================

cat > src/features/properties/relationships/propertyDomainMap.ts <<'EOF'
export const propertyDomainMap = {
  property: ["lease", "payment", "device"],
}
EOF

cat > src/features/leases/relationships/leaseDomainMap.ts <<'EOF'
export const leaseDomainMap = {
  lease: ["property", "payment", "device"],
}
EOF

cat > src/features/payments/relationships/paymentDomainMap.ts <<'EOF'
export const paymentDomainMap = {
  payment: ["lease", "property"],
}
EOF

cat > src/features/devices/relationships/deviceDomainMap.ts <<'EOF'
export const deviceDomainMap = {
  device: ["property", "lease", "lock"],
}
EOF

cat > src/features/locks/relationships/lockDomainMap.ts <<'EOF'
export const lockDomainMap = {
  lock: ["device", "property", "lease", "security"],
}
EOF

cat > src/features/security/relationships/securityDomainMap.ts <<'EOF'
export const securityDomainMap = {
  security: ["property", "lease", "device", "lock"],
}
EOF

# ============================================================
# DOMAIN COMPOSITION ROOTS
# ============================================================

cat > src/application/composition/createDomainModules.ts <<'EOF'
import { dashboardModule } from "../../features/dashboard/composition/dashboardModule"
import { propertyModule } from "../../features/properties/composition/propertyModule"
import { leaseModule } from "../../features/leases/composition/leaseModule"
import { paymentModule } from "../../features/payments/composition/paymentModule"
import { deviceModule } from "../../features/devices/composition/deviceModule"
import { lockModule } from "../../features/locks/composition/lockModule"
import { securityModule } from "../../features/security/composition/securityModule"

export function createDomainModules() {
  return [
    dashboardModule,
    propertyModule,
    leaseModule,
    paymentModule,
    deviceModule,
    lockModule,
    securityModule,
  ]
}
EOF

cat > src/application/composition/createApplicationRoot.ts <<'EOF'
import { createDomainModuleRegistry } from "./domainModuleRegistry"
import { createDomainModules } from "./createDomainModules"

export function createApplicationRoot() {
  const registry = createDomainModuleRegistry()

  for (const module of createDomainModules()) {
    registry.register(module)
  }

  return {
    domains: registry,
  }
}
EOF

# ============================================================
# FINAL INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10E COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10E LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "Composition" \
  "$(find src/application/composition src/features/*/composition -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Registration" \
  "$(find src/application/registration src/features/*/registration -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Runtime" \
  "$(find src/application/runtime src/runtime src/features/*/runtime -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Contexts" \
  "$(find src/application/context src/features/*/context -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Navigation" \
  "$(find src/application/navigation src/runtime/navigation src/features/*/navigation -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Persistence projections" \
  "$(find src/features/*/persistence -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Operational projections" \
  "$(find src/features/*/projections -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Relationships" \
  "$(find src/features/*/relationships -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Command handlers" \
  "$(find src/features/*/commands/handlers -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Query handlers" \
  "$(find src/features/*/queries/handlers -type f 2>/dev/null | wc -l)"

echo
echo "DOMAIN COUNTS"
echo "------------------------------------------------------------"

for domain in "${DOMAINS[@]}"; do
  printf "%-15s %s\n" "$domain" \
    "$(find "src/features/$domain" -type f | wc -l)"
done

echo
echo "Backup: $BACKUP"
echo
echo "============================================================"
echo "NEXT: PHASE 10F"
echo "FRONTEND DATAFLOW + EVENT/COMMAND/QUERY PIPELINE DEPTH"
echo "============================================================"
