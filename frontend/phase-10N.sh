#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10N"
echo "OPERATOR WORKSPACE UI + ENTITY LIST/DETAIL SURFACES"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10N-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/ui" \
    "src/features/$domain/ui/layout" \
    "src/features/$domain/ui/list" \
    "src/features/$domain/ui/detail" \
    "src/features/$domain/ui/header" \
    "src/features/$domain/ui/filters" \
    "src/features/$domain/ui/sorting" \
    "src/features/$domain/ui/status" \
    "src/features/$domain/ui/timeline" \
    "src/features/$domain/ui/history" \
    "src/features/$domain/ui/actions" \
    "src/features/$domain/ui/relations" \
    "src/features/$domain/ui/metrics" \
    "src/features/$domain/ui/empty" \
    "src/features/$domain/ui/error"
done

mkdir -p \
  src/components/operator \
  src/components/operator/list \
  src/components/operator/detail \
  src/components/operator/header \
  src/components/operator/filters \
  src/components/operator/timeline \
  src/components/operator/actions \
  src/components/operator/relations \
  src/components/operator/status \
  src/components/operator/metrics \
  src/components/operator/empty \
  src/components/operator/error \
  src/application/operator-ui \
  src/application/operator-ui/list \
  src/application/operator-ui/detail \
  src/application/operator-ui/filters \
  src/application/operator-ui/sorting \
  src/application/operator-ui/timeline \
  src/application/operator-ui/actions \
  src/application/operator-ui/relations \
  src/runtime/operator-ui \
  src/runtime/operator-ui/domains

# ============================================================
# SHARED OPERATOR UI MODELS
# ============================================================

cat > src/application/operator-ui/list/listState.ts <<'EOF'
export interface OperatorListState {
  loading: boolean
  refreshing: boolean
  empty: boolean
  error?: string
  page: number
  pageSize: number
  total: number
  selectedIds: string[]
}
EOF

cat > src/application/operator-ui/list/listQuery.ts <<'EOF'
export interface OperatorListQuery {
  search?: string
  status?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: "asc" | "desc"
}
EOF

cat > src/application/operator-ui/list/listSelection.ts <<'EOF'
export interface ListSelection {
  selectedIds: string[]
}

export function createListSelection(
  ids: string[] = [],
): ListSelection {
  return {
    selectedIds: [...ids],
  }
}
EOF

cat > src/application/operator-ui/list/listPagination.ts <<'EOF'
export interface ListPagination {
  page: number
  pageSize: number
  total: number
  hasNext: boolean
  hasPrevious: boolean
}

export function createListPagination(
  page = 1,
  pageSize = 25,
  total = 0,
): ListPagination {
  return {
    page,
    pageSize,
    total,
    hasNext: page * pageSize < total,
    hasPrevious: page > 1,
  }
}
EOF

# ============================================================
# SHARED DETAIL MODELS
# ============================================================

cat > src/application/operator-ui/detail/detailState.ts <<'EOF'
export interface OperatorDetailState {
  loading: boolean
  refreshing: boolean
  found: boolean
  degraded: boolean
  error?: string
  entityId?: string
}
EOF

cat > src/application/operator-ui/detail/detailSection.ts <<'EOF'
export interface DetailSection {
  id: string
  title: string
  visible: boolean
  order: number
}
EOF

cat > src/application/operator-ui/detail/detailField.ts <<'EOF'
export interface DetailField {
  id: string
  label: string
  value: string | number
  emphasis?: "normal" | "muted" | "warning" | "critical"
}
EOF

# ============================================================
# FILTER / SORT CORE
# ============================================================

cat > src/application/operator-ui/filters/filterDefinition.ts <<'EOF'
export interface FilterDefinition {
  id: string
  label: string
  type: "text" | "select" | "date" | "boolean"
  options?: string[]
}
EOF

cat > src/application/operator-ui/filters/filterState.ts <<'EOF'
export interface FilterState {
  values: Record<string, string | boolean | undefined>
}

export function emptyFilterState(): FilterState {
  return {
    values: {},
  }
}
EOF

cat > src/application/operator-ui/filters/applyFilters.ts <<'EOF'
export function applyFilters<T extends Record<string, unknown>>(
  records: T[],
  values: Record<string, unknown>,
): T[] {
  return records.filter((record) =>
    Object.entries(values).every(
      ([key, expected]) => {
        if (
          expected === undefined ||
          expected === ""
        ) {
          return true
        }

        return record[key] === expected
      },
    ),
  )
}
EOF

cat > src/application/operator-ui/sorting/sortDefinition.ts <<'EOF'
export interface SortDefinition {
  field: string
  direction: "asc" | "desc"
}
EOF

cat > src/application/operator-ui/sorting/sortRecords.ts <<'EOF'
export function sortRecords<T extends Record<string, unknown>>(
  records: T[],
  field: string,
  direction: "asc" | "desc" = "asc",
): T[] {
  return [...records].sort((left, right) => {
    const a = left[field]
    const b = right[field]

    if (a === b) return 0

    const result =
      String(a ?? "").localeCompare(
        String(b ?? ""),
        undefined,
        { numeric: true },
      )

    return direction === "asc"
      ? result
      : -result
  })
}
EOF

# ============================================================
# SHARED REACT SURFACES
# ============================================================

cat > src/components/operator/list/OperatorListShell.tsx <<'EOF'
import type { ReactNode } from "react"

export function OperatorListShell({
  title,
  toolbar,
  children,
}: {
  title: string
  toolbar?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-lg font-black text-kiri-text">
          {title}
        </h2>
        {toolbar}
      </div>

      <div className="rounded-2xl border border-white/7 bg-kiri-950/55 p-5">
        {children}
      </div>
    </section>
  )
}
EOF

cat > src/components/operator/detail/OperatorDetailShell.tsx <<'EOF'
import type { ReactNode } from "react"

export function OperatorDetailShell({
  title,
  header,
  children,
}: {
  title: string
  header?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-lg font-black text-kiri-text">
          {title}
        </h2>
        {header}
      </div>

      <div className="rounded-2xl border border-white/7 bg-kiri-950/55 p-5">
        {children}
      </div>
    </section>
  )
}
EOF

cat > src/components/operator/header/EntityHeader.tsx <<'EOF'
export function EntityHeader({
  label,
  id,
  status,
}: {
  label: string
  id: string
  status?: string
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="text-[10px] uppercase tracking-[0.18em] text-kiri-text-muted">
          {label}
        </div>
        <div className="mt-1 text-xl font-black text-kiri-text">
          {id}
        </div>
      </div>

      {status ? (
        <span className="rounded-full border border-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-kiri-text-muted">
          {status}
        </span>
      ) : null}
    </div>
  )
}
EOF

cat > src/components/operator/filters/FilterBar.tsx <<'EOF'
import type { ReactNode } from "react"

export function FilterBar({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/7 bg-kiri-950/40 p-3">
      {children}
    </div>
  )
}
EOF

cat > src/components/operator/timeline/ActivityTimeline.tsx <<'EOF'
export function ActivityTimeline({
  items,
}: {
  items: Array<{
    id: string
    title: string
    occurredAt: string
    severity?: "info" | "warning" | "critical"
  }>
}) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex gap-3 rounded-xl border border-white/7 p-3"
        >
          <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-kiri-blue-400" />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-kiri-text">
              {item.title}
            </div>
            <div className="mt-1 text-[10px] text-kiri-text-muted">
              {item.occurredAt}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
EOF

cat > src/components/operator/actions/OperatorActionBar.tsx <<'EOF'
import type { ReactNode } from "react"

export function OperatorActionBar({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {children}
    </div>
  )
}
EOF

cat > src/components/operator/relations/RelationChips.tsx <<'EOF'
export function RelationChips({
  relations,
}: {
  relations: Array<{
    id: string
    label: string
    domain: string
  }>
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {relations.map((relation) => (
        <span
          key={relation.id}
          className="rounded-full border border-white/10 px-3 py-1 text-[10px] text-kiri-text-muted"
        >
          {relation.domain}: {relation.label}
        </span>
      ))}
    </div>
  )
}
EOF

cat > src/components/operator/status/EntityStatus.tsx <<'EOF'
export function EntityStatus({
  label,
  tone = "normal",
}: {
  label: string
  tone?: "normal" | "warning" | "critical"
}) {
  return (
    <span
      className={[
        "rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        tone === "normal" &&
          "border-kiri-green-500/20 text-kiri-green-300",
        tone === "warning" &&
          "border-kiri-amber-500/20 text-kiri-amber-300",
        tone === "critical" &&
          "border-kiri-red-500/20 text-kiri-red-300",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </span>
  )
}
EOF

cat > src/components/operator/metrics/MetricGrid.tsx <<'EOF'
export function MetricGrid({
  items,
}: {
  items: Array<{
    id: string
    label: string
    value: string | number
  }>
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-xl border border-white/7 bg-kiri-950/50 p-4"
        >
          <div className="text-xs text-kiri-text-muted">
            {item.label}
          </div>
          <div className="mt-1 text-2xl font-black text-kiri-text">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  )
}
EOF

cat > src/components/operator/empty/OperatorEmptyState.tsx <<'EOF'
export function OperatorEmptyState({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="rounded-xl border border-dashed border-white/10 p-8 text-center">
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

cat > src/components/operator/error/OperatorErrorState.tsx <<'EOF'
export function OperatorErrorState({
  title,
  detail,
}: {
  title: string
  detail: string
}) {
  return (
    <div className="rounded-xl border border-kiri-red-500/20 bg-kiri-red-500/5 p-5">
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

# ============================================================
# DOMAIN UI GENERATOR
# ============================================================

make_domain_ui() {
  local domain="$1"
  local singular="$2"
  local label="$3"
  local enabled="$4"

  cat > "src/features/$domain/ui/layout/${singular}WorkspaceLayout.tsx" <<EOF
import type { ReactNode } from "react"

export function ${singular^}WorkspaceLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="space-y-5">
      <header>
        <div className="text-[10px] uppercase tracking-[0.18em] text-kiri-blue-400">
          ${label}
        </div>
        <h1 className="mt-1 text-2xl font-black text-kiri-text">
          ${label} workspace
        </h1>
      </header>
      {children}
    </div>
  )
}
EOF

  cat > "src/features/$domain/ui/list/${singular}ListTable.tsx" <<EOF
export function ${singular^}ListTable({
  rows = [],
}: {
  rows?: Array<{
    id: string
    status?: string
  }>
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/7">
      <div className="grid grid-cols-[1fr_auto] border-b border-white/7 px-4 py-3 text-[10px] uppercase tracking-wider text-kiri-text-muted">
        <span>Identifier</span>
        <span>Status</span>
      </div>

      {rows.map((row) => (
        <div
          key={row.id}
          className="grid grid-cols-[1fr_auto] border-b border-white/5 px-4 py-3 last:border-b-0"
        >
          <span className="truncate text-xs text-kiri-text">
            {row.id}
          </span>
          <span className="text-[10px] text-kiri-text-muted">
            {row.status ?? "unknown"}
          </span>
        </div>
      ))}
    </div>
  )
}
EOF

  cat > "src/features/$domain/ui/list/${singular}ListToolbar.tsx" <<EOF
import type { ReactNode } from "react"

export function ${singular^}ListToolbar({
  children,
}: {
  children?: ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="text-xs font-semibold text-kiri-text">
        ${label}
      </div>
      <div className="flex flex-wrap gap-2">
        {children}
      </div>
    </div>
  )
}
EOF

  cat > "src/features/$domain/ui/detail/${singular}DetailLayout.tsx" <<EOF
import type { ReactNode } from "react"

export function ${singular^}DetailLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="grid gap-4 xl:grid-cols-12">
      <div className="xl:col-span-8">
        {children}
      </div>
    </div>
  )
}
EOF

  cat > "src/features/$domain/ui/detail/${singular}DetailFields.tsx" <<EOF
export function ${singular^}DetailFields({
  fields,
}: {
  fields: Array<{
    id: string
    label: string
    value: string | number
  }>
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {fields.map((field) => (
        <div
          key={field.id}
          className="rounded-xl border border-white/7 p-4"
        >
          <div className="text-[10px] uppercase tracking-wider text-kiri-text-muted">
            {field.label}
          </div>
          <div className="mt-1 text-sm font-semibold text-kiri-text">
            {field.value}
          </div>
        </div>
      ))}
    </div>
  )
}
EOF

  cat > "src/features/$domain/ui/header/${singular}EntityHeader.tsx" <<EOF
import { EntityHeader } from "../../../../components/operator/header/EntityHeader"

export function ${singular^}EntityHeader({
  id,
  status,
}: {
  id: string
  status?: string
}) {
  return (
    <EntityHeader
      label="${label}"
      id={id}
      status={status}
    />
  )
}
EOF

  cat > "src/features/$domain/ui/filters/${singular}FilterBar.tsx" <<EOF
import type { ReactNode } from "react"
import { FilterBar } from "../../../../components/operator/filters/FilterBar"

export function ${singular^}FilterBar({
  children,
}: {
  children?: ReactNode
}) {
  return <FilterBar>{children}</FilterBar>
}
EOF

  cat > "src/features/$domain/ui/sorting/${singular}SortModel.ts" <<EOF
export interface ${singular^}SortModel {
  field: string
  direction: "asc" | "desc"
}

export const default${singular^}Sort:
  ${singular^}SortModel = {
  field: "id",
  direction: "asc",
}
EOF

  cat > "src/features/$domain/ui/status/${singular}OperationalStatus.tsx" <<EOF
import { EntityStatus } from "../../../../components/operator/status/EntityStatus"

export function ${singular^}OperationalStatus({
  status,
}: {
  status: string
}) {
  const normalized = status.toLowerCase()

  const tone =
    normalized.includes("fail") ||
    normalized.includes("blocked") ||
    normalized.includes("error")
      ? "critical"
      : normalized.includes("degrad") ||
          normalized.includes("pending")
        ? "warning"
        : "normal"

  return (
    <EntityStatus
      label={status}
      tone={tone}
    />
  )
}
EOF

  cat > "src/features/$domain/ui/timeline/${singular}Timeline.tsx" <<EOF
import { ActivityTimeline } from "../../../../components/operator/timeline/ActivityTimeline"

export function ${singular^}Timeline({
  items = [],
}: {
  items?: Array<{
    id: string
    title: string
    occurredAt: string
  }>
}) {
  return (
    <ActivityTimeline items={items} />
  )
}
EOF

  cat > "src/features/$domain/ui/history/${singular}History.tsx" <<EOF
export function ${singular^}History({
  items = [],
}: {
  items?: Array<{
    id: string
    action: string
    occurredAt: string
  }>
}) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="rounded-lg border border-white/7 px-3 py-2"
        >
          <div className="text-xs font-semibold text-kiri-text">
            {item.action}
          </div>
          <div className="mt-1 text-[10px] text-kiri-text-muted">
            {item.occurredAt}
          </div>
        </div>
      ))}
    </div>
  )
}
EOF

  cat > "src/features/$domain/ui/actions/${singular}Actions.tsx" <<EOF
import type { ReactNode } from "react"
import { OperatorActionBar } from "../../../../components/operator/actions/OperatorActionBar"

export function ${singular^}Actions({
  children,
}: {
  children?: ReactNode
}) {
  return (
    <OperatorActionBar>
      {children}
    </OperatorActionBar>
  )
}
EOF

  cat > "src/features/$domain/ui/relations/${singular}Relations.tsx" <<EOF
import { RelationChips } from "../../../../components/operator/relations/RelationChips"

export function ${singular^}Relations({
  items = [],
}: {
  items?: Array<{
    id: string
    label: string
    domain: string
  }>
}) {
  return <RelationChips relations={items} />
}
EOF

  cat > "src/features/$domain/ui/metrics/${singular}Metrics.tsx" <<EOF
import { MetricGrid } from "../../../../components/operator/metrics/MetricGrid"

export function ${singular^}Metrics({
  items = [],
}: {
  items?: Array<{
    id: string
    label: string
    value: string | number
  }>
}) {
  return <MetricGrid items={items} />
}
EOF

  cat > "src/features/$domain/ui/empty/${singular}EmptyState.tsx" <<EOF
import { OperatorEmptyState } from "../../../../components/operator/empty/OperatorEmptyState"

export function ${singular^}EmptyState() {
  return (
    <OperatorEmptyState
      title="No ${label,,} available"
      detail="No records are currently available for this workspace."
    />
  )
}
EOF

  cat > "src/features/$domain/ui/error/${singular}ErrorState.tsx" <<EOF
import { OperatorErrorState } from "../../../../components/operator/error/OperatorErrorState"

export function ${singular^}ErrorState({
  detail = "The ${label,,} workspace could not load its operational data.",
}: {
  detail?: string
}) {
  return (
    <OperatorErrorState
      title="${label} unavailable"
      detail={detail}
    />
  )
}
EOF

  if [[ "$enabled" == "false" ]]; then
    cat > "src/features/$domain/ui/error/${singular}IngressBlocked.tsx" <<EOF
export function ${singular^}IngressBlocked() {
  return (
    <div className="rounded-xl border border-kiri-amber-500/20 bg-kiri-amber-500/5 p-5">
      <div className="text-sm font-bold text-kiri-text">
        ${label} operations are blocked
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Production HTTP ingress for this domain has not been verified.
      </div>
    </div>
  )
}
EOF
  fi
}

make_domain_ui dashboard dashboard Dashboard true
make_domain_ui properties property Properties true
make_domain_ui leases lease Leases true
make_domain_ui payments payment Payments true
make_domain_ui devices device Devices true
make_domain_ui locks lock Locks false
make_domain_ui security security Security false

# ============================================================
# DOMAIN DETAIL SURFACE MODELS
# ============================================================

cat > src/features/properties/ui/detail/PropertyDetailSurface.tsx <<'EOF'
import { PropertyDetailFields } from "./propertyDetailFields"

export function PropertyDetailSurface({
  id,
  status,
  occupancy,
  availableUnits,
  totalUnits,
}: {
  id: string
  status: string
  occupancy: string | number
  availableUnits: string | number
  totalUnits: string | number
}) {
  return (
    <div className="space-y-5">
      <PropertyDetailFields
        fields={[
          { id: "id", label: "Property", value: id },
          { id: "status", label: "Status", value: status },
          { id: "occupancy", label: "Occupancy", value: occupancy },
          {
            id: "available",
            label: "Available units",
            value: availableUnits,
          },
          {
            id: "total",
            label: "Total units",
            value: totalUnits,
          },
        ]}
      />
    </div>
  )
}
EOF

cat > src/features/leases/ui/detail/LeaseDetailSurface.tsx <<'EOF'
import { LeaseDetailFields } from "./leaseDetailFields"

export function LeaseDetailSurface({
  id,
  propertyId,
  tenantId,
  status,
}: {
  id: string
  propertyId: string
  tenantId: string
  status: string
}) {
  return (
    <LeaseDetailFields
      fields={[
        { id: "id", label: "Lease", value: id },
        {
          id: "property",
          label: "Property",
          value: propertyId,
        },
        {
          id: "tenant",
          label: "Tenant",
          value: tenantId,
        },
        {
          id: "status",
          label: "Status",
          value: status,
        },
      ]}
    />
  )
}
EOF

cat > src/features/payments/ui/detail/PaymentDetailSurface.tsx <<'EOF'
import { PaymentDetailFields } from "./paymentDetailFields"

export function PaymentDetailSurface({
  id,
  amount,
  currency,
  status,
  reference,
}: {
  id: string
  amount: string
  currency: string
  status: string
  reference: string
}) {
  return (
    <PaymentDetailFields
      fields={[
        { id: "id", label: "Payment", value: id },
        { id: "amount", label: "Amount", value: amount },
        {
          id: "currency",
          label: "Currency",
          value: currency,
        },
        { id: "status", label: "Status", value: status },
        {
          id: "reference",
          label: "Reference",
          value: reference,
        },
      ]}
    />
  )
}
EOF

cat > src/features/devices/ui/detail/DeviceDetailSurface.tsx <<'EOF'
import { DeviceDetailFields } from "./deviceDetailFields"

export function DeviceDetailSurface({
  id,
  status,
  online,
  firmwareVersion,
  lastSeenAt,
}: {
  id: string
  status: string
  online: string
  firmwareVersion: string
  lastSeenAt: string
}) {
  return (
    <DeviceDetailFields
      fields={[
        { id: "id", label: "Device", value: id },
        { id: "status", label: "Status", value: status },
        { id: "online", label: "Connectivity", value: online },
        {
          id: "firmware",
          label: "Firmware",
          value: firmwareVersion,
        },
        {
          id: "lastSeen",
          label: "Last seen",
          value: lastSeenAt,
        },
      ]}
    />
  )
}
EOF

# ============================================================
# OPERATOR COMPOSITION MODEL
# ============================================================

cat > src/application/operator-ui/workspaceComposition.ts <<'EOF'
export interface OperatorWorkspaceComposition {
  domain: string
  listEnabled: boolean
  detailEnabled: boolean
  timelineEnabled: boolean
  relationsEnabled: boolean
  actionsEnabled: boolean
  readOnly: boolean
}
EOF

cat > src/application/operator-ui/workspaceCompositions.ts <<'EOF'
import type {
  OperatorWorkspaceComposition,
} from "./workspaceComposition"

export const operatorWorkspaceCompositions:
  OperatorWorkspaceComposition[] = [
  {
    domain: "dashboard",
    listEnabled: true,
    detailEnabled: true,
    timelineEnabled: true,
    relationsEnabled: true,
    actionsEnabled: true,
    readOnly: true,
  },
  {
    domain: "property",
    listEnabled: true,
    detailEnabled: true,
    timelineEnabled: true,
    relationsEnabled: true,
    actionsEnabled: true,
    readOnly: true,
  },
  {
    domain: "lease",
    listEnabled: true,
    detailEnabled: true,
    timelineEnabled: true,
    relationsEnabled: true,
    actionsEnabled: true,
    readOnly: true,
  },
  {
    domain: "payment",
    listEnabled: true,
    detailEnabled: true,
    timelineEnabled: true,
    relationsEnabled: true,
    actionsEnabled: true,
    readOnly: true,
  },
  {
    domain: "device",
    listEnabled: true,
    detailEnabled: true,
    timelineEnabled: true,
    relationsEnabled: true,
    actionsEnabled: true,
    readOnly: true,
  },
  {
    domain: "lock",
    listEnabled: true,
    detailEnabled: false,
    timelineEnabled: true,
    relationsEnabled: true,
    actionsEnabled: false,
    readOnly: true,
  },
  {
    domain: "security",
    listEnabled: true,
    detailEnabled: false,
    timelineEnabled: true,
    relationsEnabled: true,
    actionsEnabled: false,
    readOnly: true,
  },
]
EOF

# ============================================================
# RUNTIME OPERATOR UI REGISTRY
# ============================================================

cat > src/runtime/operator-ui/domainUiDefinition.ts <<'EOF'
export interface DomainUiDefinition {
  domain: string
  label: string
  route: string
  enabled: boolean
  readOnly: boolean
}
EOF

cat > src/runtime/operator-ui/domainUiDefinitions.ts <<'EOF'
import type { DomainUiDefinition } from "./domainUiDefinition"

export const domainUiDefinitions:
  DomainUiDefinition[] = [
  {
    domain: "dashboard",
    label: "Operations",
    route: "/",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "property",
    label: "Properties",
    route: "/properties",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "lease",
    label: "Leases",
    route: "/leases",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "payment",
    label: "Payments",
    route: "/payments",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "device",
    label: "Devices",
    route: "/devices",
    enabled: true,
    readOnly: true,
  },
  {
    domain: "lock",
    label: "Locks",
    route: "/locks",
    enabled: false,
    readOnly: true,
  },
  {
    domain: "security",
    label: "Security",
    route: "/security",
    enabled: false,
    readOnly: true,
  },
]
EOF

cat > src/runtime/operator-ui/createDomainUiRegistry.ts <<'EOF'
import {
  domainUiDefinitions,
} from "./domainUiDefinitions"

export function createDomainUiRegistry() {
  return new Map(
    domainUiDefinitions.map((item) => [
      item.domain,
      item,
    ]),
  )
}
EOF

# ============================================================
# INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10N COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10N LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "Shared operator UI" \
  "$(find src/components/operator src/application/operator-ui -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature UI surfaces" \
  "$(find src/features/*/ui -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Feature activation" \
  "$(find src/features/*/activation -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Page-data bindings" \
  "$(find src/features/*/page-data/bindings src/features/*/page-data/adapters -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Workspace controllers" \
  "$(find src/features/*/workspace/controllers src/features/*/workspace/bindings -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Workspace state/actions" \
  "$(find src/features/*/workspace/state src/features/*/workspace/actions src/features/*/workspace/events -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Runtime operator UI" \
  "$(find src/runtime/operator-ui -type f 2>/dev/null | wc -l)"

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
echo "NEXT: PHASE 10O"
echo "FRONTEND COMMAND SURFACES + OPERATOR ACTION WORKFLOWS"
echo "============================================================"
