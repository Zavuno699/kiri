#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10M"
echo "PAGE ACTIVATION + WORKSPACE DATAFLOW BINDING"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10M-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/activation" \
    "src/features/$domain/activation/pages" \
    "src/features/$domain/activation/workspace" \
    "src/features/$domain/activation/routes" \
    "src/features/$domain/activation/navigation" \
    "src/features/$domain/activation/runtime" \
    "src/features/$domain/page-data/bindings" \
    "src/features/$domain/page-data/selectors" \
    "src/features/$domain/page-data/adapters" \
    "src/features/$domain/page-data/actions" \
    "src/features/$domain/page-data/commands" \
    "src/features/$domain/page-data/queries" \
    "src/features/$domain/workspace/bindings" \
    "src/features/$domain/workspace/controllers" \
    "src/features/$domain/workspace/state" \
    "src/features/$domain/workspace/actions" \
    "src/features/$domain/workspace/selectors" \
    "src/features/$domain/workspace/events" \
    "src/features/$domain/workspace/persistence"
done

mkdir -p \
  src/application/page-activation \
  src/application/page-activation/pages \
  src/application/page-activation/workspaces \
  src/application/page-activation/routes \
  src/application/page-activation/navigation \
  src/application/page-activation/registry \
  src/application/workspace-binding \
  src/application/workspace-binding/core \
  src/application/workspace-binding/registry \
  src/application/workspace-binding/selectors \
  src/application/workspace-binding/events \
  src/application/workspace-binding/state \
  src/application/navigation/activation \
  src/application/navigation/activation/routes \
  src/application/navigation/activation/features \
  src/runtime/page-activation \
  src/runtime/page-activation/pages \
  src/runtime/page-activation/workspaces \
  src/runtime/page-activation/routes \
  src/runtime/workspace-binding \
  src/runtime/workspace-binding/registry

# ============================================================
# PAGE ACTIVATION CORE
# ============================================================

cat > src/application/page-activation/pages/pageDefinition.ts <<'EOF'
export interface PageDefinition {
  id: string
  domain: string
  route: string
  kind: "overview" | "list" | "detail" | "workspace"
  enabled: boolean
  readOnly: boolean
}
EOF

cat > src/application/page-activation/pages/pageActivationState.ts <<'EOF'
export type PageActivationState =
  | "inactive"
  | "activating"
  | "active"
  | "degraded"
  | "blocked"
  | "failed"
EOF

cat > src/application/page-activation/pages/pageActivation.ts <<'EOF'
import type { PageDefinition } from "./pageDefinition"
import type { PageActivationState } from "./pageActivationState"

export interface PageActivation {
  page: PageDefinition
  state: PageActivationState
  activatedAt?: string
  reason?: string
}
EOF

cat > src/application/page-activation/registry/pageRegistry.ts <<'EOF'
import type { PageDefinition } from "../pages/pageDefinition"

export interface PageRegistry {
  register(page: PageDefinition): void
  get(id: string): PageDefinition | undefined
  resolve(route: string): PageDefinition | undefined
  list(domain?: string): PageDefinition[]
}

export function createPageRegistry(): PageRegistry {
  const values = new Map<string, PageDefinition>()

  return {
    register(page) {
      values.set(page.id, page)
    },

    get(id) {
      return values.get(id)
    },

    resolve(route) {
      return [...values.values()].find(
        (item) => item.route === route && item.enabled,
      )
    },

    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}
EOF

cat > src/application/page-activation/routes/pageRouteBinding.ts <<'EOF'
export interface PageRouteBinding {
  pageId: string
  domain: string
  route: string
  enabled: boolean
}
EOF

cat > src/application/page-activation/navigation/pageNavigationActivation.ts <<'EOF'
export interface PageNavigationActivation {
  pageId: string
  label: string
  route: string
  enabled: boolean
  order: number
}
EOF

cat > src/application/page-activation/workspaces/workspaceActivation.ts <<'EOF'
export interface WorkspaceActivation {
  id: string
  domain: string
  pageId: string
  enabled: boolean
  readOnly: boolean
}
EOF

cat > src/application/page-activation/registry/pageActivationRegistry.ts <<'EOF'
import type { PageActivation } from "../pages/pageActivation"

export interface PageActivationRegistry {
  register(value: PageActivation): void
  get(pageId: string): PageActivation | undefined
  list(): PageActivation[]
}

export function createPageActivationRegistry():
  PageActivationRegistry {
  const values = new Map<string, PageActivation>()

  return {
    register(value) {
      values.set(value.page.id, value)
    },

    get(pageId) {
      return values.get(pageId)
    },

    list() {
      return [...values.values()]
    },
  }
}
EOF

# ============================================================
# WORKSPACE BINDING CORE
# ============================================================

cat > src/application/workspace-binding/core/workspaceBinding.ts <<'EOF'
export interface WorkspaceBinding<T = unknown> {
  id: string
  domain: string
  pageId: string
  data?: T
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}
EOF

cat > src/application/workspace-binding/core/workspaceBindingRequest.ts <<'EOF'
export interface WorkspaceBindingRequest {
  domain: string
  pageId: string
  entityId?: string
  query?: Record<string, unknown>
  correlationId?: string
}
EOF

cat > src/application/workspace-binding/core/workspaceBindingResult.ts <<'EOF'
export interface WorkspaceBindingResult<T = unknown> {
  ok: boolean
  data?: T
  error?: string
  correlationId?: string
}
EOF

cat > src/application/workspace-binding/core/workspaceBindingController.ts <<'EOF'
import type { WorkspaceBinding } from "./workspaceBinding"

export interface WorkspaceBindingController<T = unknown> {
  state(): WorkspaceBinding<T>
  load(
    query?: unknown,
  ): Promise<WorkspaceBinding<T>>
  refresh(): Promise<WorkspaceBinding<T>>
}
EOF

cat > src/application/workspace-binding/registry/workspaceBindingRegistry.ts <<'EOF'
import type { WorkspaceBinding } from "../core/workspaceBinding"

export interface WorkspaceBindingRegistry {
  register<T>(
    binding: WorkspaceBinding<T>,
  ): void

  get<T>(
    id: string,
  ): WorkspaceBinding<T> | undefined

  list(domain?: string): WorkspaceBinding[]
}

export function createWorkspaceBindingRegistry():
  WorkspaceBindingRegistry {
  const values = new Map<
    string,
    WorkspaceBinding
  >()

  return {
    register(binding) {
      values.set(binding.id, binding)
    },

    get(id) {
      return values.get(id)
    },

    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}
EOF

cat > src/application/workspace-binding/selectors/selectWorkspaceData.ts <<'EOF'
import type { WorkspaceBinding } from "../core/workspaceBinding"

export function selectWorkspaceData<T>(
  binding: WorkspaceBinding<T>,
): T | undefined {
  return binding.data
}
EOF

cat > src/application/workspace-binding/selectors/selectWorkspaceLoading.ts <<'EOF'
import type { WorkspaceBinding } from "../core/workspaceBinding"

export function selectWorkspaceLoading(
  binding: WorkspaceBinding,
): boolean {
  return binding.loading || binding.refreshing
}
EOF

cat > src/application/workspace-binding/events/workspaceBindingEvent.ts <<'EOF'
export interface WorkspaceBindingEvent {
  type:
    | "binding.started"
    | "binding.loaded"
    | "binding.refreshed"
    | "binding.degraded"
    | "binding.failed"
  domain: string
  pageId: string
  occurredAt: string
}
EOF

cat > src/application/workspace-binding/state/workspaceBindingRuntimeState.ts <<'EOF'
export interface WorkspaceBindingRuntimeState {
  total: number
  loading: number
  refreshing: number
  ready: number
  degraded: number
  failed: number
}

export const initialWorkspaceBindingRuntimeState:
  WorkspaceBindingRuntimeState = {
  total: 0,
  loading: 0,
  refreshing: 0,
  ready: 0,
  degraded: 0,
  failed: 0,
}
EOF

# ============================================================
# PAGE NAVIGATION ACTIVATION
# ============================================================

cat > src/application/navigation/activation/routes/activeRouteDefinition.ts <<'EOF'
export interface ActiveRouteDefinition {
  id: string
  route: string
  domain: string
  pageId: string
  enabled: boolean
}
EOF

cat > src/application/navigation/activation/routes/activeRoutes.ts <<'EOF'
import type { ActiveRouteDefinition } from "./activeRouteDefinition"

export const activeRoutes:
  ActiveRouteDefinition[] = [
  {
    id: "dashboard",
    route: "/",
    domain: "dashboard",
    pageId: "dashboard.overview",
    enabled: true,
  },
  {
    id: "properties",
    route: "/properties",
    domain: "property",
    pageId: "property.list",
    enabled: true,
  },
  {
    id: "leases",
    route: "/leases",
    domain: "lease",
    pageId: "lease.list",
    enabled: true,
  },
  {
    id: "payments",
    route: "/payments",
    domain: "payment",
    pageId: "payment.list",
    enabled: true,
  },
  {
    id: "devices",
    route: "/devices",
    domain: "device",
    pageId: "device.workspace",
    enabled: true,
  },
  {
    id: "locks",
    route: "/locks",
    domain: "lock",
    pageId: "lock.workspace",
    enabled: false,
  },
  {
    id: "security",
    route: "/security",
    domain: "security",
    pageId: "security.workspace",
    enabled: false,
  },
]
EOF

cat > src/application/navigation/activation/features/featureNavigationActivation.ts <<'EOF'
export interface FeatureNavigationActivation {
  domain: string
  label: string
  route: string
  enabled: boolean
  readOnly: boolean
}
EOF

# ============================================================
# DOMAIN PAGE ACTIVATION GENERATOR
# ============================================================

make_activation() {
  local domain="$1"
  local singular="$2"
  local route="$3"
  local kind="$4"
  local enabled="$5"

  cat > "src/features/$domain/activation/pages/${singular}PageDefinition.ts" <<EOF
import type { PageDefinition } from "../../../../application/page-activation/pages/pageDefinition"

export const ${singular}PageDefinition:
  PageDefinition = {
  id: "${singular}.${kind}",
  domain: "${domain}",
  route: "${route}",
  kind: "${kind}",
  enabled: ${enabled},
  readOnly: true,
}
EOF

  cat > "src/features/$domain/activation/pages/${singular}PageActivation.ts" <<EOF
import type { PageActivation } from "../../../../application/page-activation/pages/pageActivation"
import { ${singular}PageDefinition } from "./${singular}PageDefinition"

export const ${singular}PageActivation:
  PageActivation = {
  page: ${singular}PageDefinition,
  state: ${enabled} ? "active" : "blocked",
  activatedAt:
    ${enabled}
      ? new Date().toISOString()
      : undefined,
  reason:
    ${enabled}
      ? undefined
      : "Production ingress is not verified.",
}
EOF

  cat > "src/features/$domain/activation/workspace/${singular}WorkspaceActivation.ts" <<EOF
import type { WorkspaceActivation } from "../../../../application/page-activation/workspaces/workspaceActivation"

export const ${singular}WorkspaceActivation:
  WorkspaceActivation = {
  id: "${domain}.workspace",
  domain: "${domain}",
  pageId: "${singular}.${kind}",
  enabled: ${enabled},
  readOnly: true,
}
EOF

  cat > "src/features/$domain/activation/routes/${singular}RouteActivation.ts" <<EOF
import type { PageRouteBinding } from "../../../../application/page-activation/routes/pageRouteBinding"

export const ${singular}RouteActivation:
  PageRouteBinding = {
  pageId: "${singular}.${kind}",
  domain: "${domain}",
  route: "${route}",
  enabled: ${enabled},
}
EOF

  cat > "src/features/$domain/activation/navigation/${singular}NavigationActivation.ts" <<EOF
import type { PageNavigationActivation } from "../../../../application/page-activation/navigation/pageNavigationActivation"

export const ${singular}NavigationActivation:
  PageNavigationActivation = {
  pageId: "${singular}.${kind}",
  label: "${singular}",
  route: "${route}",
  enabled: ${enabled},
  order: 1,
}
EOF

  cat > "src/features/$domain/activation/runtime/${singular}RuntimeActivation.ts" <<EOF
export interface ${singular^}RuntimeActivation {
  domain: "${domain}"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const ${singular}RuntimeActivation:
  ${singular^}RuntimeActivation = {
  domain: "${domain}",
  pageReady: ${enabled},
  workspaceReady: ${enabled},
  enabled: ${enabled},
}
EOF

  cat > "src/features/$domain/activation/pages/${singular}ListPageAdapter.ts" <<EOF
export interface ${singular^}ListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const ${singular}ListPageAdapter:
  ${singular^}ListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
EOF

  cat > "src/features/$domain/activation/pages/${singular}DetailPageAdapter.ts" <<EOF
export interface ${singular^}DetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const ${singular}DetailPageAdapter:
  ${singular^}DetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
EOF

  cat > "src/features/$domain/activation/workspace/${singular}WorkspaceAdapter.ts" <<EOF
export interface ${singular^}WorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const ${singular}WorkspaceAdapter:
  ${singular^}WorkspaceAdapter = {
  bind(value) {
    return value
  },
}
EOF
}

make_activation dashboard dashboard "/" overview true
make_activation properties property "/properties" list true
make_activation leases lease "/leases" list true
make_activation payments payment "/payments" list true
make_activation devices device "/devices" workspace true
make_activation locks lock "/locks" workspace false
make_activation security security "/security" workspace false

# ============================================================
# PAGE-DATA BINDINGS
# ============================================================

make_binding() {
  local domain="$1"
  local singular="$2"

  cat > "src/features/$domain/page-data/bindings/${singular}PageBinding.ts" <<EOF
export interface ${singular^}PageBinding<T = unknown> {
  pageId: string
  domain: "${domain}"
  route: string
  data?: T
  loading: boolean
  error?: string
}

export function create${singular^}PageBinding<T>(
  pageId: string,
  route: string,
): ${singular^}PageBinding<T> {
  return {
    pageId,
    domain: "${domain}",
    route,
    loading: false,
  }
}
EOF

  cat > "src/features/$domain/page-data/bindings/${singular}ListBinding.ts" <<EOF
export interface ${singular^}ListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const empty${singular^}ListBinding:
  ${singular^}ListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
EOF

  cat > "src/features/$domain/page-data/adapters/${singular}PageDataAdapter.ts" <<EOF
export interface ${singular^}PageDataAdapter {
  adapt(value: unknown): unknown
}

export const ${singular}PageDataAdapter:
  ${singular^}PageDataAdapter = {
  adapt(value) {
    return value
  },
}
EOF

  cat > "src/features/$domain/page-data/actions/${singular}PageDataActions.ts" <<EOF
export interface ${singular^}PageDataActions {
  load(query?: unknown): Promise<void>
  refresh(): Promise<void>
  select(id: string): void
}
EOF

  cat > "src/features/$domain/page-data/commands/${singular}PageCommandBridge.ts" <<EOF
export interface ${singular^}PageCommandBridge {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}
EOF

  cat > "src/features/$domain/page-data/queries/${singular}PageQueryBridge.ts" <<EOF
export interface ${singular^}PageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
EOF
}

make_binding dashboard dashboard
make_binding properties property
make_binding leases lease
make_binding payments payment
make_binding devices device
make_binding locks lock
make_binding security security

# ============================================================
# WORKSPACE BINDINGS
# ============================================================

make_workspace_binding() {
  local domain="$1"
  local singular="$2"
  local enabled="$3"

  cat > "src/features/$domain/workspace/bindings/${singular}WorkspaceBinding.ts" <<EOF
import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function create${singular^}WorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "${domain}.workspace",
    domain: "${domain}",
    pageId: "${singular}.workspace",
    loading: false,
    refreshing: false,
    degraded: ${enabled} ? false : true,
    error:
      ${enabled}
        ? undefined
        : "Production capability is not verified.",
  }
}
EOF

  cat > "src/features/$domain/workspace/controllers/${singular}WorkspaceController.ts" <<EOF
import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export interface ${singular^}WorkspaceController {
  load(
    query?: unknown,
  ): Promise<WorkspaceBinding>
  refresh(): Promise<WorkspaceBinding>
}

export function create${singular^}WorkspaceController(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): ${singular^}WorkspaceController {
  let current: WorkspaceBinding = {
    id: "${domain}.workspace",
    domain: "${domain}",
    pageId: "${singular}.workspace",
    loading: false,
    refreshing: false,
    degraded: ${enabled} ? false : true,
    error:
      ${enabled}
        ? undefined
        : "Production capability is not verified.",
  }

  return {
    async load(query) {
      if (!${enabled}) {
        return current
      }

      current = {
        ...current,
        loading: true,
      }

      try {
        const data = await load(query)

        current = {
          ...current,
          loading: false,
          data,
          degraded: false,
        }
      } catch (error) {
        current = {
          ...current,
          loading: false,
          degraded: true,
          error:
            error instanceof Error
              ? error.message
              : "Workspace load failed.",
        }
      }

      return current
    },

    async refresh() {
      return current
    },
  }
}
EOF

  cat > "src/features/$domain/workspace/state/${singular}WorkspaceState.ts" <<EOF
export interface ${singular^}WorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initial${singular^}WorkspaceState:
  ${singular^}WorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: ${enabled} ? false : true,
  error:
    ${enabled}
      ? undefined
      : "Production capability is not verified.",
}
EOF

  cat > "src/features/$domain/workspace/actions/${singular}WorkspaceActions.ts" <<EOF
export interface ${singular^}WorkspaceActions {
  select(id: string): void
  clearSelection(): void
  refresh(): Promise<void>
}
EOF

  cat > "src/features/$domain/workspace/selectors/${singular}WorkspaceSelectors.ts" <<EOF
import type { ${singular^}WorkspaceState } from "../state/${singular}WorkspaceState"

export function select${singular^}Selection(
  state: ${singular^}WorkspaceState,
): string | undefined {
  return state.selectedId
}

export function select${singular^}Ready(
  state: ${singular^}WorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}
EOF

  cat > "src/features/$domain/workspace/events/${singular}WorkspaceEvent.ts" <<EOF
export interface ${singular^}WorkspaceEvent {
  type:
    | "${domain}.workspace.loaded"
    | "${domain}.workspace.refreshed"
    | "${domain}.workspace.degraded"
  occurredAt: string
}
EOF

  cat > "src/features/$domain/workspace/persistence/${singular}WorkspacePersistence.ts" <<EOF
export interface ${singular^}WorkspacePersistence {
  save(
    key: string,
    value: unknown,
  ): void

  load(
    key: string,
  ): unknown | undefined
}

export function create${singular^}WorkspacePersistence():
  ${singular^}WorkspacePersistence {
  const values = new Map<string, unknown>()

  return {
    save(key, value) {
      values.set(key, value)
    },

    load(key) {
      return values.get(key)
    },
  }
}
EOF
}

make_workspace_binding dashboard dashboard true
make_workspace_binding properties property true
make_workspace_binding leases lease true
make_workspace_binding payments payment true
make_workspace_binding devices device true
make_workspace_binding locks lock false
make_workspace_binding security security false

# ============================================================
# PAGE ACTIVATION REGISTRY
# ============================================================

cat > src/application/page-activation/registry/createDefaultPageRegistry.ts <<'EOF'
import { createPageRegistry } from "./pageRegistry"
import { pageDataRoutes } from "../../page-data/navigation/pageDataRoutes"

export function createDefaultPageRegistry() {
  const registry = createPageRegistry()

  for (const route of pageDataRoutes) {
    const pageKind =
      route.page === "overview"
        ? "overview"
        : route.page === "workspace"
          ? "workspace"
          : route.page

    registry.register({
      id: route.id,
      domain: route.domain,
      route: route.path,
      kind: pageKind,
      enabled: route.enabled,
      readOnly: true,
    })
  }

  return registry
}
EOF

cat > src/application/page-activation/routes/createActiveRouteMap.ts <<'EOF'
import { activeRoutes } from "../../navigation/activation/routes/activeRoutes"

export function createActiveRouteMap() {
  return new Map(
    activeRoutes.map((route) => [
      route.route,
      route,
    ]),
  )
}
EOF

# ============================================================
# RUNTIME PAGE ACTIVATION
# ============================================================

cat > src/runtime/page-activation/pages/runtimePageActivationRegistry.ts <<'EOF'
import {
  pageDataRoutes,
} from "../../application/page-data/navigation/pageDataRoutes"

export function createRuntimePageActivationRegistry() {
  return new Map(
    pageDataRoutes.map((route) => [
      route.id,
      {
        id: route.id,
        domain: route.domain,
        route: route.path,
        enabled: route.enabled,
      },
    ]),
  )
}
EOF

cat > src/runtime/page-activation/workspaces/runtimeWorkspaceActivationRegistry.ts <<'EOF'
export const runtimeWorkspaceActivationRegistry =
  new Map([
    [
      "dashboard.workspace",
      {
        domain: "dashboard",
        enabled: true,
      },
    ],
    [
      "property.workspace",
      {
        domain: "property",
        enabled: true,
      },
    ],
    [
      "lease.workspace",
      {
        domain: "lease",
        enabled: true,
      },
    ],
    [
      "payment.workspace",
      {
        domain: "payment",
        enabled: true,
      },
    ],
    [
      "device.workspace",
      {
        domain: "device",
        enabled: true,
      },
    ],
    [
      "lock.workspace",
      {
        domain: "lock",
        enabled: false,
      },
    ],
    [
      "security.workspace",
      {
        domain: "security",
        enabled: false,
      },
    ],
  ])
EOF

cat > src/runtime/page-activation/routes/runtimeRouteActivation.ts <<'EOF'
import {
  activeRoutes,
} from "../../application/navigation/activation/routes/activeRoutes"

export function runtimeRouteActivation(
  path: string,
) {
  return activeRoutes.find(
    (route) =>
      route.route === path &&
      route.enabled,
  )
}
EOF

# ============================================================
# RUNTIME WORKSPACE BINDING REGISTRY
# ============================================================

cat > src/runtime/workspace-binding/registry/runtimeWorkspaceBindingRegistry.ts <<'EOF'
export interface RuntimeWorkspaceBindingDefinition {
  id: string
  domain: string
  pageId: string
  enabled: boolean
}

export const runtimeWorkspaceBindingDefinitions:
  RuntimeWorkspaceBindingDefinition[] = [
  {
    id: "dashboard.workspace",
    domain: "dashboard",
    pageId: "dashboard.workspace",
    enabled: true,
  },
  {
    id: "property.workspace",
    domain: "property",
    pageId: "property.workspace",
    enabled: true,
  },
  {
    id: "lease.workspace",
    domain: "lease",
    pageId: "lease.workspace",
    enabled: true,
  },
  {
    id: "payment.workspace",
    domain: "payment",
    pageId: "payment.workspace",
    enabled: true,
  },
  {
    id: "device.workspace",
    domain: "device",
    pageId: "device.workspace",
    enabled: true,
  },
  {
    id: "lock.workspace",
    domain: "lock",
    pageId: "lock.workspace",
    enabled: false,
  },
  {
    id: "security.workspace",
    domain: "security",
    pageId: "security.workspace",
    enabled: false,
  },
]
EOF

# ============================================================
# SHARED ACTIVATION VIEW
# ============================================================

cat > src/components/domain/PageActivationState.tsx <<'EOF'
export function PageActivationState({
  active,
  label,
  reason,
}: {
  active: boolean
  label: string
  reason?: string
}) {
  return (
    <div className="rounded-lg border border-white/7 px-3 py-2">
      <div className="flex items-center gap-2">
        <span
          className={[
            "h-2 w-2 rounded-full",
            active
              ? "bg-kiri-green-400"
              : "bg-kiri-red-400",
          ].join(" ")}
        />

        <span className="text-xs font-semibold text-kiri-text">
          {label}
        </span>
      </div>

      {reason ? (
        <div className="mt-1 text-[10px] text-kiri-text-muted">
          {reason}
        </div>
      ) : null}
    </div>
  )
}
EOF

cat > src/components/domain/WorkspaceDataState.tsx <<'EOF'
export function WorkspaceDataState({
  loading,
  degraded,
  empty,
}: {
  loading: boolean
  degraded: boolean
  empty: boolean
}) {
  if (loading) {
    return (
      <div className="rounded-xl border border-white/7 p-5 text-xs text-kiri-text-muted">
        Loading operational data…
      </div>
    )
  }

  if (degraded) {
    return (
      <div className="rounded-xl border border-kiri-amber-500/20 bg-kiri-amber-500/5 p-5 text-xs text-kiri-text-muted">
        Operational data is currently degraded or unavailable.
      </div>
    )
  }

  if (empty) {
    return (
      <div className="rounded-xl border border-dashed border-white/10 p-5 text-xs text-kiri-text-muted">
        No records available.
      </div>
    )
  }

  return null
}
EOF

# ============================================================
# INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10M COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10M LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "Page activation core" \
  "$(find src/application/page-activation -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Workspace binding core" \
  "$(find src/application/workspace-binding -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Navigation activation" \
  "$(find src/application/navigation/activation -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature activation" \
  "$(find src/features/*/activation -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Page-data bindings" \
  "$(find src/features/*/page-data/bindings src/features/*/page-data/adapters -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Page-data actions/commands/queries" \
  "$(find src/features/*/page-data/actions src/features/*/page-data/commands src/features/*/page-data/queries -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Workspace bindings" \
  "$(find src/features/*/workspace/bindings -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Workspace controllers" \
  "$(find src/features/*/workspace/controllers -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Workspace state/selectors" \
  "$(find src/features/*/workspace/state src/features/*/workspace/selectors -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Runtime activation" \
  "$(find src/runtime/page-activation src/runtime/workspace-binding -type f 2>/dev/null | wc -l)"

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
echo "NEXT: PHASE 10N"
echo "FRONTEND OPERATOR WORKSPACE UI + ENTITY LIST/DETAIL SURFACES"
echo "============================================================"
