#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10D"
echo "MASSIVE DOMAIN WORKSPACE + COMMAND SURFACE BATCH"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10D-backup-$STAMP"

mkdir -p "$BACKUP"

# ============================================================
# DIRECTORIES
# ============================================================

DOMAINS=(
  dashboard
  properties
  leases
  payments
  devices
  locks
  security
)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/workspace" \
    "src/features/$domain/commands" \
    "src/features/$domain/queries" \
    "src/features/$domain/tables" \
    "src/features/$domain/forms" \
    "src/features/$domain/dialogs" \
    "src/features/$domain/hooks" \
    "src/features/$domain/guards" \
    "src/features/$domain/operations" \
    "src/features/$domain/runtime"
done

mkdir -p \
  src/components/domain \
  src/components/tables \
  src/components/forms \
  src/components/dialogs \
  src/components/commands \
  src/application/domain \
  src/application/workspace \
  src/application/commanding \
  src/application/querying \
  src/application/forms \
  src/application/dialogs \
  src/application/tables

# ============================================================
# BACKUP EXISTING INDEX FILES
# ============================================================

for domain in "${DOMAINS[@]}"; do
  for f in \
    "src/features/$domain/index.ts" \
    "src/features/$domain/commands/index.ts" \
    "src/features/$domain/queries/index.ts"
  do
    if [[ -f "$f" ]]; then
      mkdir -p "$BACKUP/$(dirname "$f")"
      cp "$f" "$BACKUP/$f"
    fi
  done
done

# ============================================================
# SHARED DOMAIN WORKSPACE FILES
# ============================================================

cat > src/application/domain/domainDescriptor.ts <<'EOF'
export interface DomainDescriptor {
  id: string
  label: string
  route: string
  enabled: boolean
  readOnly: boolean
}

export function createDomainDescriptor(
  value: DomainDescriptor,
): DomainDescriptor {
  return { ...value }
}
EOF

cat > src/application/domain/domainRegistry.ts <<'EOF'
import type { DomainDescriptor } from "./domainDescriptor"

export interface DomainRegistry {
  register(domain: DomainDescriptor): void
  get(id: string): DomainDescriptor | undefined
  all(): DomainDescriptor[]
}

export function createDomainRegistry(): DomainRegistry {
  const values = new Map<string, DomainDescriptor>()

  return {
    register(domain) {
      values.set(domain.id, domain)
    },
    get(id) {
      return values.get(id)
    },
    all() {
      return [...values.values()]
    },
  }
}
EOF

cat > src/application/workspace/workspaceSection.ts <<'EOF'
export interface WorkspaceSection {
  id: string
  title: string
  order: number
  visible: boolean
}
EOF

cat > src/application/workspace/workspaceDefinition.ts <<'EOF'
import type { WorkspaceSection } from "./workspaceSection"

export interface WorkspaceDefinition {
  id: string
  title: string
  domain: string
  sections: WorkspaceSection[]
}
EOF

cat > src/application/workspace/workspaceRegistry.ts <<'EOF'
import type { WorkspaceDefinition } from "./workspaceDefinition"

export interface WorkspaceRegistry {
  register(workspace: WorkspaceDefinition): void
  get(id: string): WorkspaceDefinition | undefined
  all(): WorkspaceDefinition[]
}

export function createWorkspaceRegistry(): WorkspaceRegistry {
  const values = new Map<string, WorkspaceDefinition>()

  return {
    register(workspace) {
      values.set(workspace.id, workspace)
    },
    get(id) {
      return values.get(id)
    },
    all() {
      return [...values.values()]
    },
  }
}
EOF

cat > src/application/commanding/commandAvailability.ts <<'EOF'
export interface CommandAvailability {
  visible: boolean
  enabled: boolean
  reason?: string
}

export function unavailableCommand(
  reason: string,
): CommandAvailability {
  return {
    visible: true,
    enabled: false,
    reason,
  }
}
EOF

cat > src/application/commanding/commandDescriptor.ts <<'EOF'
export interface CommandDescriptor {
  id: string
  label: string
  domain: string
  destructive: boolean
  enabled: boolean
}
EOF

cat > src/application/commanding/commandRegistry.ts <<'EOF'
import type { CommandDescriptor } from "./commandDescriptor"

export interface CommandRegistry {
  register(value: CommandDescriptor): void
  get(id: string): CommandDescriptor | undefined
  list(domain?: string): CommandDescriptor[]
}

export function createCommandRegistry(): CommandRegistry {
  const values = new Map<string, CommandDescriptor>()

  return {
    register(value) {
      values.set(value.id, value)
    },
    get(id) {
      return values.get(id)
    },
    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter((item) => item.domain === domain)
        : all
    },
  }
}
EOF

cat > src/application/querying/queryDescriptor.ts <<'EOF'
export interface QueryDescriptor {
  id: string
  label: string
  domain: string
  cacheable: boolean
}
EOF

cat > src/application/querying/queryRegistry.ts <<'EOF'
import type { QueryDescriptor } from "./queryDescriptor"

export interface QueryRegistry {
  register(value: QueryDescriptor): void
  get(id: string): QueryDescriptor | undefined
  list(domain?: string): QueryDescriptor[]
}

export function createQueryRegistry(): QueryRegistry {
  const values = new Map<string, QueryDescriptor>()

  return {
    register(value) {
      values.set(value.id, value)
    },
    get(id) {
      return values.get(id)
    },
    list(domain) {
      const all = [...values.values()]
      return domain
        ? all.filter((item) => item.domain === domain)
        : all
    },
  }
}
EOF

cat > src/application/forms/formState.ts <<'EOF'
export interface FormState<T> {
  value: T
  dirty: boolean
  valid: boolean
  submitting: boolean
  error?: string
}

export function createFormState<T>(
  value: T,
): FormState<T> {
  return {
    value,
    dirty: false,
    valid: true,
    submitting: false,
  }
}
EOF

cat > src/application/dialogs/dialogState.ts <<'EOF'
export interface DialogState {
  open: boolean
  title?: string
  description?: string
  intent?: "info" | "warning" | "danger"
}

export const closedDialog: DialogState = {
  open: false,
}
EOF

cat > src/application/tables/tableState.ts <<'EOF'
export interface TableState {
  page: number
  pageSize: number
  selectedIds: string[]
  sortBy?: string
  sortDirection?: "asc" | "desc"
}

export const initialTableState: TableState = {
  page: 1,
  pageSize: 25,
  selectedIds: [],
}
EOF

# ============================================================
# SHARED UI COMPONENTS
# ============================================================

cat > src/components/domain/DomainWorkspace.tsx <<'EOF'
import type { ReactNode } from "react"

export function DomainWorkspace({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-black text-kiri-text">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-1 text-sm text-kiri-text-muted">
            {subtitle}
          </p>
        ) : null}
      </header>

      {children}
    </div>
  )
}
EOF

cat > src/components/domain/DomainToolbar.tsx <<'EOF'
import type { ReactNode } from "react"

export function DomainToolbar({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/7 bg-kiri-950/50 p-3">
      {children}
    </div>
  )
}
EOF

cat > src/components/domain/DomainSection.tsx <<'EOF'
import type { ReactNode } from "react"

export function DomainSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="space-y-3">
      <h2 className="text-sm font-bold text-kiri-text">
        {title}
      </h2>
      {children}
    </section>
  )
}
EOF

cat > src/components/tables/TableEmpty.tsx <<'EOF'
export function TableEmpty({
  title = "No records",
  detail = "There is no data available for this view.",
}: {
  title?: string
  detail?: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-6 py-10 text-center">
      <div className="text-sm font-semibold text-kiri-text">
        {title}
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        {detail}
      </div>
    </div>
  )
}
EOF

cat > src/components/tables/TableLoading.tsx <<'EOF'
export function TableLoading({
  rows = 5,
}: {
  rows?: number
}) {
  return (
    <div className="space-y-2">
      {Array.from({ length: rows }).map((_, index) => (
        <div
          key={index}
          className="h-10 animate-pulse rounded-lg bg-white/[0.035]"
        />
      ))}
    </div>
  )
}
EOF

cat > src/components/tables/TableToolbar.tsx <<'EOF'
import type { ReactNode } from "react"

export function TableToolbar({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-white/7 pb-3">
      {children}
    </div>
  )
}
EOF

cat > src/components/forms/FormSection.tsx <<'EOF'
import type { ReactNode } from "react"

export function FormSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <fieldset className="space-y-3 rounded-xl border border-white/7 p-4">
      <legend className="px-2 text-xs font-bold uppercase tracking-wider text-kiri-text-muted">
        {title}
      </legend>
      {children}
    </fieldset>
  )
}
EOF

cat > src/components/forms/FormActions.tsx <<'EOF'
import type { ReactNode } from "react"

export function FormActions({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex justify-end gap-2 border-t border-white/7 pt-4">
      {children}
    </div>
  )
}
EOF

cat > src/components/dialogs/ConfirmDialogSurface.tsx <<'EOF'
export function ConfirmDialogSurface({
  title,
  detail,
  disabled = false,
}: {
  title: string
  detail: string
  disabled?: boolean
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-kiri-950 p-5">
      <div className="text-sm font-bold text-kiri-text">
        {title}
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        {detail}
      </div>
      {disabled ? (
        <div className="mt-4 text-xs text-kiri-red-300">
          This operation is currently unavailable.
        </div>
      ) : null}
    </div>
  )
}
EOF

cat > src/components/commands/CommandSurface.tsx <<'EOF'
import type { ReactNode } from "react"

export function CommandSurface({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/60 p-4">
      <div className="mb-3 text-sm font-bold text-kiri-text">
        {title}
      </div>
      {children}
    </section>
  )
}
EOF

# ============================================================
# PER-DOMAIN GENERATION
# ============================================================

make_domain_file() {
  local domain="$1"
  local title="$2"
  local singular="$3"

  cat > "src/features/$domain/workspace/${singular}WorkspaceModel.ts" <<EOF
export interface ${singular^}WorkspaceModel {
  domain: string
  title: string
  entityId?: string
  loading: boolean
  degraded: boolean
  readOnly: boolean
}
EOF

  cat > "src/features/$domain/workspace/${singular}WorkspaceState.ts" <<EOF
export interface ${singular^}WorkspaceState {
  selectedId?: string
  refreshedAt?: string
  loading: boolean
  error?: string
}

export const initial${singular^}WorkspaceState: ${singular^}WorkspaceState = {
  loading: false,
}
EOF

  cat > "src/features/$domain/workspace/${singular}Workspace.tsx" <<EOF
import type { ReactNode } from "react"

export function ${singular^}Workspace({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <div className="text-xs uppercase tracking-[0.18em] text-kiri-blue-400">
        ${title}
      </div>
      {children}
    </div>
  )
}
EOF

  cat > "src/features/$domain/workspace/${singular}WorkspaceHeader.tsx" <<EOF
export function ${singular^}WorkspaceHeader({
  title = "${title}",
}: {
  title?: string
}) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-black text-kiri-text">
          {title}
        </h1>
        <p className="mt-1 text-xs text-kiri-text-muted">
          ${title} operational workspace
        </p>
      </div>
    </header>
  )
}
EOF

  cat > "src/features/$domain/workspace/${singular}WorkspaceEmpty.tsx" <<EOF
export function ${singular^}WorkspaceEmpty() {
  return (
    <div className="rounded-xl border border-dashed border-white/10 px-6 py-10 text-center">
      <div className="text-sm font-semibold text-kiri-text">
        No ${title,,} selected
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Select an item to inspect its operational state.
      </div>
    </div>
  )
}
EOF

  cat > "src/features/$domain/commands/${singular}CommandTypes.ts" <<EOF
export type ${singular^}CommandType =
  | "refresh"
  | "inspect"
  | "open"
  | "close"
EOF

  cat > "src/features/$domain/commands/create${singular^}Command.ts" <<EOF
import type { ${singular^}CommandType } from "./${singular}CommandTypes"

export interface ${singular^}Command {
  type: ${singular^}CommandType
  ${singular}Id?: string
}

export function create${singular^}Command(
  type: ${singular^}CommandType,
  ${singular}Id?: string,
): ${singular^}Command {
  return {
    type,
    ${singular}Id,
  }
}
EOF

  cat > "src/features/$domain/commands/${singular}CommandPolicy.ts" <<EOF
import type { ${singular^}CommandType } from "./${singular}CommandTypes"

export function ${singular}CommandAllowed(
  type: ${singular^}CommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}
EOF

  cat > "src/features/$domain/commands/${singular}CommandState.ts" <<EOF
export interface ${singular^}CommandState {
  running: boolean
  lastCommand?: string
  error?: string
}

export const initial${singular^}CommandState: ${singular^}CommandState = {
  running: false,
}
EOF

  cat > "src/features/$domain/queries/${singular}ListQuery.ts" <<EOF
export interface ${singular^}ListQuery {
  page?: number
  pageSize?: number
  search?: string
  status?: string
}
EOF

  cat > "src/features/$domain/queries/${singular}DetailsQuery.ts" <<EOF
export interface ${singular^}DetailsQuery {
  id: string
}
EOF

  cat > "src/features/$domain/queries/${singular}QueryKeys.ts" <<EOF
export const ${singular}QueryKeys = {
  list: ["${domain}", "list"] as const,
  details: (id: string) =>
    ["${domain}", "details", id] as const,
}
EOF

  cat > "src/features/$domain/tables/${singular}Columns.tsx" <<EOF
export interface ${singular^}Column {
  id: string
  label: string
  sortable?: boolean
}

export const ${singular}Columns: ${singular^}Column[] = [
  {
    id: "id",
    label: "ID",
    sortable: true,
  },
  {
    id: "status",
    label: "Status",
    sortable: true,
  },
]
EOF

  cat > "src/features/$domain/tables/${singular}TableModel.ts" <<EOF
export interface ${singular^}TableRow {
  id: string
  status: string
  selected?: boolean
}

export interface ${singular^}TableModel {
  rows: ${singular^}TableRow[]
  total: number
}
EOF

  cat > "src/features/$domain/forms/${singular}FilterForm.ts" <<EOF
export interface ${singular^}FilterForm {
  search: string
  status: string
}

export const empty${singular^}FilterForm: ${singular^}FilterForm = {
  search: "",
  status: "",
}
EOF

  cat > "src/features/$domain/forms/${singular}FormState.ts" <<EOF
export interface ${singular^}FormState {
  submitting: boolean
  dirty: boolean
  valid: boolean
  error?: string
}
EOF

  cat > "src/features/$domain/dialogs/${singular}InspectDialog.tsx" <<EOF
export function ${singular^}InspectDialog({
  open,
  id,
}: {
  open: boolean
  id?: string
}) {
  if (!open) return null

  return (
    <div className="rounded-xl border border-white/10 bg-kiri-950 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Inspect ${title}
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        {id ?? "No identifier selected"}
      </div>
    </div>
  )
}
EOF

  cat > "src/features/$domain/dialogs/${singular}CommandDialog.tsx" <<EOF
export function ${singular^}CommandDialog({
  open,
}: {
  open: boolean
}) {
  if (!open) return null

  return (
    <div className="rounded-xl border border-white/10 bg-kiri-950 p-5">
      <div className="text-sm font-bold text-kiri-text">
        ${title} command
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Command execution is controlled by the ${title} policy.
      </div>
    </div>
  )
}
EOF

  cat > "src/features/$domain/hooks/use${singular^}Selection.ts" <<EOF
import { useState } from "react"

export function use${singular^}Selection() {
  const [selectedId, setSelectedId] =
    useState<string | undefined>()

  return {
    selectedId,
    select: setSelectedId,
    clear: () => setSelectedId(undefined),
  }
}
EOF

  cat > "src/features/$domain/hooks/use${singular^}Filters.ts" <<EOF
import { useState } from "react"

export function use${singular^}Filters() {
  const [search, setSearch] = useState("")
  const [status, setStatus] = useState("")

  return {
    search,
    status,
    setSearch,
    setStatus,
  }
}
EOF

  cat > "src/features/$domain/guards/${singular}Availability.ts" <<EOF
export interface ${singular^}Availability {
  available: boolean
  reason?: string
}

export function ${singular}Available(): ${singular^}Availability {
  return {
    available: true,
  }
}
EOF

  cat > "src/features/$domain/guards/${singular}CommandGuard.ts" <<EOF
export function ${singular}CommandGuard(
  command: string,
): boolean {
  return command === "refresh" || command === "inspect"
}
EOF

  cat > "src/features/$domain/operations/${singular}RefreshOperation.ts" <<EOF
export interface ${singular^}RefreshOperation {
  execute(): Promise<void>
}

export function create${singular^}RefreshOperation(
  refresh: () => Promise<unknown>,
): ${singular^}RefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
EOF

  cat > "src/features/$domain/operations/${singular}InspectOperation.ts" <<EOF
export interface ${singular^}InspectOperation {
  execute(id: string): Promise<unknown>
}

export function create${singular^}InspectOperation(
  inspect: (id: string) => Promise<unknown>,
): ${singular^}InspectOperation {
  return {
    execute: inspect,
  }
}
EOF

  cat > "src/features/$domain/runtime/${singular}Runtime.ts" <<EOF
export interface ${singular^}Runtime {
  domain: "${domain}"
  started: boolean
  readOnly: boolean
}

export const ${singular}Runtime: ${singular^}Runtime = {
  domain: "${domain}",
  started: false,
  readOnly: true,
}
EOF

  cat > "src/features/$domain/runtime/${singular}RuntimeState.ts" <<EOF
export interface ${singular^}RuntimeState {
  healthy: boolean
  degraded: boolean
  reason?: string
}
EOF
}

make_domain_file dashboard "Dashboard" dashboard
make_domain_file properties "Properties" property
make_domain_file leases "Leases" lease
make_domain_file payments "Payments" payment
make_domain_file devices "Devices" device
make_domain_file locks "Locks" lock
make_domain_file security "Security" security

# ============================================================
# EXTRA DOMAIN-SPECIFIC FILES
# ============================================================

cat > src/features/dashboard/operations/dashboardHealthOperation.ts <<'EOF'
export interface DashboardHealthOperation {
  evaluate(
    services: Array<{ healthy: boolean }>,
  ): {
    healthy: number
    degraded: number
  }
}

export function createDashboardHealthOperation():
  DashboardHealthOperation {
  return {
    evaluate(services) {
      return {
        healthy: services.filter((item) => item.healthy).length,
        degraded: services.filter((item) => !item.healthy).length,
      }
    },
  }
}
EOF

cat > src/features/dashboard/queries/dashboardEventQuery.ts <<'EOF'
export interface DashboardEventQuery {
  limit?: number
  severity?: "info" | "warning" | "critical"
}
EOF

cat > src/features/dashboard/tables/dashboardEventColumns.tsx <<'EOF'
export const dashboardEventColumns = [
  { id: "time", label: "Time" },
  { id: "type", label: "Type" },
  { id: "severity", label: "Severity" },
  { id: "source", label: "Source" },
]
EOF

cat > src/features/dashboard/workspace/dashboardCommandPanel.tsx <<'EOF'
export function DashboardCommandPanel() {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/50 p-4">
      <div className="text-sm font-bold text-kiri-text">
        Operational controls
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Refresh and inspection controls are available.
      </div>
    </div>
  )
}
EOF

cat > src/features/properties/operations/propertyOccupancyOperation.ts <<'EOF'
export function calculatePropertyOccupancy(
  totalUnits: number | undefined,
  availableUnits: number | undefined,
): number {
  if (
    totalUnits === undefined ||
    availableUnits === undefined ||
    totalUnits <= 0
  ) {
    return 0
  }

  return (
    (totalUnits - availableUnits) /
    totalUnits
  ) * 100
}
EOF

cat > src/features/properties/queries/propertyOccupancyQuery.ts <<'EOF'
export interface PropertyOccupancyQuery {
  propertyId: string
  includeTrend?: boolean
}
EOF

cat > src/features/properties/workspace/propertyMetricsPanel.tsx <<'EOF'
export function PropertyMetricsPanel({
  occupancy,
  availableUnits,
  totalUnits,
}: {
  occupancy: number
  availableUnits: number
  totalUnits: number
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-white/7 p-4">
        <div className="text-xs text-kiri-text-muted">Occupancy</div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {occupancy.toFixed(1)}%
        </div>
      </div>

      <div className="rounded-xl border border-white/7 p-4">
        <div className="text-xs text-kiri-text-muted">Available</div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {availableUnits}
        </div>
      </div>

      <div className="rounded-xl border border-white/7 p-4">
        <div className="text-xs text-kiri-text-muted">Total</div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {totalUnits}
        </div>
      </div>
    </div>
  )
}
EOF

cat > src/features/leases/operations/leaseDurationOperation.ts <<'EOF'
export function leaseDurationDays(
  start?: string,
  end?: string,
): number | undefined {
  if (!start || !end) return undefined

  const from = Date.parse(start)
  const to = Date.parse(end)

  if (!Number.isFinite(from) || !Number.isFinite(to)) {
    return undefined
  }

  return Math.max(
    0,
    Math.ceil(
      (to - from) /
      (24 * 60 * 60 * 1000),
    ),
  )
}
EOF

cat > src/features/leases/queries/leaseEntitlementQuery.ts <<'EOF'
export interface LeaseEntitlementQuery {
  leaseId: string
  includePaymentHistory?: boolean
}
EOF

cat > src/features/leases/workspace/leaseEntitlementPanel.tsx <<'EOF'
export function LeaseEntitlementPanel({
  daysGranted,
}: {
  daysGranted: number
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/50 p-4">
      <div className="text-xs text-kiri-text-muted">
        Entitlement
      </div>
      <div className="mt-1 text-xl font-black text-kiri-text">
        {daysGranted} days
      </div>
    </div>
  )
}
EOF

cat > src/features/payments/operations/paymentSettlementOperation.ts <<'EOF'
export function paymentSettlementReady(
  status?: string,
): boolean {
  const normalized = status?.toLowerCase()
  return (
    normalized === "settled" ||
    normalized === "completed"
  )
}
EOF

cat > src/features/payments/queries/paymentReconciliationQuery.ts <<'EOF'
export interface PaymentReconciliationQuery {
  paymentId: string
  includeLease?: boolean
  includeEntitlement?: boolean
}
EOF

cat > src/features/payments/workspace/paymentSettlementPanel.tsx <<'EOF'
export function PaymentSettlementPanel({
  status,
  reference,
}: {
  status: string
  reference: string
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/50 p-4">
      <div className="text-xs text-kiri-text-muted">
        Settlement
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {status}
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        {reference}
      </div>
    </div>
  )
}
EOF

cat > src/features/devices/operations/deviceConnectivityOperation.ts <<'EOF'
export function deviceConnectivityLabel(
  online?: boolean,
): string {
  if (online === undefined) return "Unknown"
  return online ? "Online" : "Offline"
}
EOF

cat > src/features/devices/queries/deviceTelemetryQuery.ts <<'EOF'
export interface DeviceTelemetryQuery {
  deviceId: string
  window?: "hour" | "day" | "week"
}
EOF

cat > src/features/devices/workspace/deviceConnectivityPanel.tsx <<'EOF'
export function DeviceConnectivityPanel({
  online,
}: {
  online?: boolean
}) {
  const label =
    online === undefined
      ? "Unknown"
      : online
        ? "Online"
        : "Offline"

  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/50 p-4">
      <div className="text-xs text-kiri-text-muted">
        Connectivity
      </div>
      <div className="mt-1 text-lg font-black text-kiri-text">
        {label}
      </div>
    </div>
  )
}
EOF

cat > src/features/locks/operations/lockStateOperation.ts <<'EOF'
export function lockStateLabel(
  locked?: boolean,
): string {
  if (locked === undefined) return "Unknown"
  return locked ? "Locked" : "Unlocked"
}
EOF

cat > src/features/locks/queries/lockHistoryQuery.ts <<'EOF'
export interface LockHistoryQuery {
  lockId: string
  limit?: number
}
EOF

cat > src/features/locks/workspace/lockSafetyPanel.tsx <<'EOF'
export function LockSafetyPanel() {
  return (
    <div className="rounded-xl border border-kiri-amber-500/20 bg-kiri-amber-500/5 p-4">
      <div className="text-sm font-bold text-kiri-text">
        Safety gate
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Lock commands remain unavailable until verified production ingress and authorization are present.
      </div>
    </div>
  )
}
EOF

cat > src/features/security/operations/securityAccessOperation.ts <<'EOF'
export function securityAccessLabel(
  granted?: boolean,
): string {
  if (granted === undefined) return "Unknown"
  return granted ? "Granted" : "Denied"
}
EOF

cat > src/features/security/queries/securityAuditQuery.ts <<'EOF'
export interface SecurityAuditQuery {
  subjectId?: string
  severity?: "info" | "warning" | "critical"
  limit?: number
}
EOF

cat > src/features/security/workspace/securitySafetyPanel.tsx <<'EOF'
export function SecuritySafetyPanel() {
  return (
    <div className="rounded-xl border border-kiri-red-500/20 bg-kiri-red-500/5 p-4">
      <div className="text-sm font-bold text-kiri-text">
        Security gate
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Security operations remain fail-closed until verified production ingress exists.
      </div>
    </div>
  )
}
EOF

# ============================================================
# DOMAIN INDEX EXPOSURE
# ============================================================

append_export() {
  local file="$1"
  local line="$2"

  if [[ -f "$file" ]] && ! grep -Fqx "$line" "$file" 2>/dev/null; then
    printf '\n%s\n' "$line" >> "$file"
  fi
}

for domain in dashboard properties leases payments devices locks security; do
  singular="$domain"
  case "$domain" in
    properties) singular="property" ;;
    payments) singular="payment" ;;
    devices) singular="device" ;;
    locks) singular="lock" ;;
    security) singular="security" ;;
    dashboard) singular="dashboard" ;;
    leases) singular="lease" ;;
  esac

  append_export \
    "src/features/$domain/index.ts" \
    "export * from './workspace/${singular}WorkspaceModel'"

  append_export \
    "src/features/$domain/index.ts" \
    "export * from './commands/${singular}CommandTypes'"

  append_export \
    "src/features/$domain/index.ts" \
    "export * from './queries/${singular}ListQuery'"

  append_export \
    "src/features/$domain/index.ts" \
    "export * from './tables/${singular}TableModel'"
done

# ============================================================
# FINAL INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10D COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "DOMAIN COUNTS"
echo "------------------------------------------------------------"

for domain in dashboard properties leases payments devices locks security; do
  printf "%-15s %s\n" "$domain" \
    "$(find "src/features/$domain" -type f | wc -l)"
done

echo
echo "10D LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-30s %s\n" \
  "Workspaces" \
  "$(find src/features -path '*/workspace/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Commands" \
  "$(find src/features -path '*/commands/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Queries" \
  "$(find src/features -path '*/queries/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Tables" \
  "$(find src/features -path '*/tables/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Forms" \
  "$(find src/features -path '*/forms/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Dialogs" \
  "$(find src/features -path '*/dialogs/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Hooks" \
  "$(find src/features -path '*/hooks/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Guards" \
  "$(find src/features -path '*/guards/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Operations" \
  "$(find src/features -path '*/operations/*' -type f | wc -l)"

printf "%-30s %s\n" \
  "Runtime" \
  "$(find src/features -path '*/runtime/*' -type f | wc -l)"

echo
echo "Backup: $BACKUP"
echo
echo "============================================================"
echo "NEXT: PHASE 10E"
echo "CROSS-DOMAIN WORKSPACE COMPOSITION + RUNTIME REGISTRATION"
echo "============================================================"
