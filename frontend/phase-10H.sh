#!/bin/bash
set -Eeuo pipefail

ROOT="/home/Rat/kirilock/frontend"
cd "$ROOT"

echo "============================================================"
echo "KIRILOCK PHASE 10H"
echo "OPERATOR SURFACES + CROSS-DOMAIN TIMELINES"
echo "============================================================"
echo "PWD: $PWD"
echo
echo "BUILD: NOT RUN"
echo "TESTS: NOT CREATED"
echo

STAMP="$(date +%Y%m%d_%H%M%S)"
BACKUP=".phase-10H-backup-$STAMP"

mkdir -p "$BACKUP"

DOMAINS=(dashboard properties leases payments devices locks security)

for domain in "${DOMAINS[@]}"; do
  mkdir -p \
    "src/features/$domain/operator" \
    "src/features/$domain/operator/cards" \
    "src/features/$domain/operator/panels" \
    "src/features/$domain/operator/timeline" \
    "src/features/$domain/operator/activity" \
    "src/features/$domain/operator/summary" \
    "src/features/$domain/operator/history" \
    "src/features/$domain/operator/relations" \
    "src/features/$domain/operator/status" \
    "src/features/$domain/operator/metrics"
done

mkdir -p \
  src/application/operator \
  src/application/operator/cards \
  src/application/operator/panels \
  src/application/operator/timeline \
  src/application/operator/activity \
  src/application/operator/history \
  src/application/operator/relations \
  src/application/operator/summary \
  src/application/operator/metrics \
  src/application/operator/workspace \
  src/application/timeline \
  src/application/timeline/builders \
  src/application/timeline/grouping \
  src/application/timeline/formatters \
  src/application/activity \
  src/application/activity/builders \
  src/application/activity/filters \
  src/application/relations \
  src/application/relations/graph \
  src/application/relations/resolvers \
  src/application/metrics \
  src/application/metrics/aggregators \
  src/runtime/operator \
  src/runtime/operator/panels \
  src/runtime/operator/workspaces \
  src/runtime/operator/timeline \
  src/runtime/operator/activity

# ============================================================
# APPLICATION OPERATOR CORE
# ============================================================

cat > src/application/operator/operatorSurface.ts <<'EOF'
export interface OperatorSurface {
  id: string
  domain: string
  title: string
  visible: boolean
  priority: number
}
EOF

cat > src/application/operator/operatorSurfaceRegistry.ts <<'EOF'
import type { OperatorSurface } from "./operatorSurface"

export interface OperatorSurfaceRegistry {
  register(value: OperatorSurface): void
  get(id: string): OperatorSurface | undefined
  list(domain?: string): OperatorSurface[]
}

export function createOperatorSurfaceRegistry():
  OperatorSurfaceRegistry {
  const values = new Map<string, OperatorSurface>()

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
        ? all.filter(
            (item) => item.domain === domain,
          )
        : all
    },
  }
}
EOF

cat > src/application/operator/cards/operatorCard.ts <<'EOF'
export interface OperatorCard {
  id: string
  label: string
  value: string | number
  status?: "normal" | "warning" | "critical"
  detail?: string
}
EOF

cat > src/application/operator/panels/operatorPanel.ts <<'EOF'
export interface OperatorPanel {
  id: string
  title: string
  domain: string
  order: number
  span: number
}
EOF

cat > src/application/operator/summary/operatorSummary.ts <<'EOF'
export interface OperatorSummary {
  total: number
  healthy: number
  degraded: number
  blocked: number
  failed: number
  updatedAt: string
}

export function emptyOperatorSummary(): OperatorSummary {
  return {
    total: 0,
    healthy: 0,
    degraded: 0,
    blocked: 0,
    failed: 0,
    updatedAt: new Date().toISOString(),
  }
}
EOF

cat > src/application/operator/workspace/operatorWorkspaceDefinition.ts <<'EOF'
import type { OperatorPanel } from "../panels/operatorPanel"

export interface OperatorWorkspaceDefinition {
  id: string
  title: string
  domain: string
  panels: OperatorPanel[]
}
EOF

cat > src/application/operator/workspace/operatorWorkspaceRegistry.ts <<'EOF'
import type { OperatorWorkspaceDefinition } from "./operatorWorkspaceDefinition"

export interface OperatorWorkspaceRegistry {
  register(value: OperatorWorkspaceDefinition): void
  get(id: string): OperatorWorkspaceDefinition | undefined
  list(): OperatorWorkspaceDefinition[]
}

export function createOperatorWorkspaceRegistry():
  OperatorWorkspaceRegistry {
  const values = new Map<string, OperatorWorkspaceDefinition>()

  return {
    register(value) {
      values.set(value.id, value)
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

# ============================================================
# TIMELINE CORE
# ============================================================

cat > src/application/timeline/timelineRecord.ts <<'EOF'
export interface TimelineRecord {
  id: string
  domain: string
  entityId?: string
  type: string
  title: string
  description?: string
  occurredAt: string
  severity: "info" | "warning" | "critical"
  correlationId?: string
}
EOF

cat > src/application/timeline/timelineCollection.ts <<'EOF'
import type { TimelineRecord } from "./timelineRecord"

export interface TimelineCollection {
  records: TimelineRecord[]
  total: number
}

export function createTimelineCollection(
  records: TimelineRecord[],
): TimelineCollection {
  return {
    records: [...records],
    total: records.length,
  }
}
EOF

cat > src/application/timeline/builders/timelineBuilder.ts <<'EOF'
import type { TimelineRecord } from "../timelineRecord"

export interface TimelineBuilder {
  add(record: TimelineRecord): void
  build(): TimelineRecord[]
}

export function createTimelineBuilder(): TimelineBuilder {
  const records: TimelineRecord[] = []

  return {
    add(record) {
      records.push(record)
    },

    build() {
      return [...records].sort(
        (a, b) =>
          Date.parse(b.occurredAt) -
          Date.parse(a.occurredAt),
      )
    },
  }
}
EOF

cat > src/application/timeline/grouping/groupTimelineByDay.ts <<'EOF'
import type { TimelineRecord } from "../timelineRecord"

export function groupTimelineByDay(
  records: TimelineRecord[],
) {
  const groups = new Map<string, TimelineRecord[]>()

  for (const record of records) {
    const key = record.occurredAt.slice(0, 10)
    const current = groups.get(key) ?? []
    current.push(record)
    groups.set(key, current)
  }

  return groups
}
EOF

cat > src/application/timeline/grouping/groupTimelineByDomain.ts <<'EOF'
import type { TimelineRecord } from "../timelineRecord"

export function groupTimelineByDomain(
  records: TimelineRecord[],
) {
  const groups = new Map<string, TimelineRecord[]>()

  for (const record of records) {
    const current =
      groups.get(record.domain) ?? []

    current.push(record)
    groups.set(record.domain, current)
  }

  return groups
}
EOF

cat > src/application/timeline/formatters/timelineLabel.ts <<'EOF'
export function timelineLabel(
  type: string,
): string {
  return type
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (char) =>
      char.toUpperCase(),
    )
}
EOF

# ============================================================
# ACTIVITY CORE
# ============================================================

cat > src/application/activity/activityRecord.ts <<'EOF'
export interface ActivityRecord {
  id: string
  domain: string
  action: string
  subjectId?: string
  actorId?: string
  outcome: "requested" | "accepted" | "completed" | "failed" | "blocked"
  occurredAt: string
  correlationId?: string
}
EOF

cat > src/application/activity/builders/activityBuilder.ts <<'EOF'
import type { ActivityRecord } from "../activityRecord"

export interface ActivityBuilder {
  add(value: ActivityRecord): void
  build(): ActivityRecord[]
}

export function createActivityBuilder(): ActivityBuilder {
  const values: ActivityRecord[] = []

  return {
    add(value) {
      values.push(value)
    },

    build() {
      return [...values].sort(
        (a, b) =>
          Date.parse(b.occurredAt) -
          Date.parse(a.occurredAt),
      )
    },
  }
}
EOF

cat > src/application/activity/filters/activityByDomain.ts <<'EOF'
import type { ActivityRecord } from "../activityRecord"

export function activityByDomain(
  records: ActivityRecord[],
  domain: string,
): ActivityRecord[] {
  return records.filter(
    (record) => record.domain === domain,
  )
}
EOF

cat > src/application/activity/filters/activityByOutcome.ts <<'EOF'
import type { ActivityRecord } from "../activityRecord"

export function activityByOutcome(
  records: ActivityRecord[],
  outcome: ActivityRecord["outcome"],
): ActivityRecord[] {
  return records.filter(
    (record) => record.outcome === outcome,
  )
}
EOF

# ============================================================
# CROSS-DOMAIN RELATION GRAPH
# ============================================================

cat > src/application/relations/graph/relationNode.ts <<'EOF'
export interface RelationNode {
  id: string
  domain: string
  label?: string
}
EOF

cat > src/application/relations/graph/relationEdge.ts <<'EOF'
export interface RelationEdge {
  source: string
  target: string
  relation: string
  confidence: "verified" | "derived" | "unverified"
}
EOF

cat > src/application/relations/graph/relationGraph.ts <<'EOF'
import type { RelationNode } from "./relationNode"
import type { RelationEdge } from "./relationEdge"

export interface RelationGraph {
  nodes: RelationNode[]
  edges: RelationEdge[]
}

export function emptyRelationGraph(): RelationGraph {
  return {
    nodes: [],
    edges: [],
  }
}
EOF

cat > src/application/relations/resolvers/resolveLeaseRelations.ts <<'EOF'
export function resolveLeaseRelations(
  leaseId: string,
  propertyId?: string,
  paymentIds: string[] = [],
  deviceIds: string[] = [],
) {
  return {
    leaseId,
    propertyId,
    paymentIds: [...paymentIds],
    deviceIds: [...deviceIds],
  }
}
EOF

cat > src/application/relations/resolvers/resolvePropertyRelations.ts <<'EOF'
export function resolvePropertyRelations(
  propertyId: string,
  leaseIds: string[] = [],
  paymentIds: string[] = [],
  deviceIds: string[] = [],
) {
  return {
    propertyId,
    leaseIds: [...leaseIds],
    paymentIds: [...paymentIds],
    deviceIds: [...deviceIds],
  }
}
EOF

# ============================================================
# METRICS
# ============================================================

cat > src/application/metrics/metricValue.ts <<'EOF'
export interface MetricValue {
  value: number
  label: string
  unit?: string
  status?: "normal" | "warning" | "critical"
}
EOF

cat > src/application/metrics/aggregators/countMetric.ts <<'EOF'
export function countMetric(
  values: unknown[],
): number {
  return values.length
}
EOF

cat > src/application/metrics/aggregators/sumMetric.ts <<'EOF'
export function sumMetric(
  values: number[],
): number {
  return values.reduce(
    (sum, value) => sum + value,
    0,
  )
}
EOF

cat > src/application/metrics/aggregators/averageMetric.ts <<'EOF'
export function averageMetric(
  values: number[],
): number {
  if (values.length === 0) return 0

  return (
    values.reduce(
      (sum, value) => sum + value,
      0,
    ) / values.length
  )
}
EOF

# ============================================================
# DOMAIN OPERATOR GENERATOR
# ============================================================

make_operator_domain() {
  local domain="$1"
  local singular="$2"
  local label="$3"

  cat > "src/features/$domain/operator/${singular}OperatorModel.ts" <<EOF
export interface ${singular^}OperatorModel {
  id?: string
  title: string
  domain: "${domain}"
  status: string
  degraded: boolean
  readOnly: boolean
}
EOF

  cat > "src/features/$domain/operator/cards/${singular}MetricCard.tsx" <<EOF
export function ${singular^}MetricCard({
  label,
  value,
  status = "normal",
}: {
  label: string
  value: string | number
  status?: "normal" | "warning" | "critical"
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/55 p-4">
      <div className="text-xs text-kiri-text-muted">
        {label}
      </div>
      <div className="mt-1 text-xl font-black text-kiri-text">
        {value}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-kiri-text-muted">
        {status}
      </div>
    </div>
  )
}
EOF

  cat > "src/features/$domain/operator/cards/${singular}StatusCard.tsx" <<EOF
export function ${singular^}StatusCard({
  status,
}: {
  status: string
}) {
  return (
    <div className="rounded-xl border border-white/7 bg-kiri-950/55 p-4">
      <div className="text-xs text-kiri-text-muted">
        Status
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {status}
      </div>
    </div>
  )
}
EOF

  cat > "src/features/$domain/operator/panels/${singular}OverviewPanel.tsx" <<EOF
export function ${singular^}OverviewPanel() {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        ${label} overview
      </div>
      <div className="mt-1 text-xs text-kiri-text-muted">
        Operational state and summary information.
      </div>
    </section>
  )
}
EOF

  cat > "src/features/$domain/operator/panels/${singular}RelationsPanel.tsx" <<EOF
export function ${singular^}RelationsPanel({
  items = [],
}: {
  items?: string[]
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Related domains
      </div>

      <div className="mt-3 space-y-2">
        {items.length === 0 ? (
          <div className="text-xs text-kiri-text-muted">
            No related entities.
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-white/7 px-3 py-2 text-xs text-kiri-text"
            >
              {item}
            </div>
          ))
        )}
      </div>
    </section>
  )
}
EOF

  cat > "src/features/$domain/operator/timeline/${singular}TimelinePanel.tsx" <<EOF
export function ${singular^}TimelinePanel({
  items = [],
}: {
  items?: Array<{
    id: string
    title: string
    occurredAt: string
  }>
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        ${label} timeline
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-white/7 px-3 py-2"
          >
            <div className="text-xs font-semibold text-kiri-text">
              {item.title}
            </div>
            <div className="mt-1 text-[10px] text-kiri-text-muted">
              {item.occurredAt}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
EOF

  cat > "src/features/$domain/operator/activity/${singular}ActivityPanel.tsx" <<EOF
export function ${singular^}ActivityPanel({
  items = [],
}: {
  items?: Array<{
    id: string
    action: string
    outcome: string
  }>
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Activity
      </div>

      <div className="mt-3 space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-white/7 px-3 py-2"
          >
            <span className="text-xs text-kiri-text">
              {item.action}
            </span>
            <span className="text-[10px] uppercase text-kiri-text-muted">
              {item.outcome}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}
EOF

  cat > "src/features/$domain/operator/summary/${singular}SummaryModel.ts" <<EOF
export interface ${singular^}SummaryModel {
  total: number
  healthy: number
  degraded: number
  failed: number
  updatedAt: string
}

export function empty${singular^}Summary():
  ${singular^}SummaryModel {
  return {
    total: 0,
    healthy: 0,
    degraded: 0,
    failed: 0,
    updatedAt: new Date().toISOString(),
  }
}
EOF

  cat > "src/features/$domain/operator/history/${singular}HistoryModel.ts" <<EOF
export interface ${singular^}HistoryModel {
  id: string
  action: string
  outcome: string
  occurredAt: string
}
EOF

  cat > "src/features/$domain/operator/relations/${singular}RelationModel.ts" <<EOF
export interface ${singular^}RelationModel {
  targetDomain: string
  targetId: string
  relation: string
  confidence: "verified" | "derived" | "unverified"
}
EOF

  cat > "src/features/$domain/operator/status/${singular}StatusSummary.ts" <<EOF
export interface ${singular^}StatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
EOF

  cat > "src/features/$domain/operator/metrics/${singular}OperationalMetrics.ts" <<EOF
export interface ${singular^}OperationalMetrics {
  total: number
  healthy: number
  degraded: number
  failed: number
  stale: number
}
EOF
}

make_operator_domain dashboard dashboard Dashboard
make_operator_domain properties property Properties
make_operator_domain leases lease Leases
make_operator_domain payments payment Payments
make_operator_domain devices device Devices
make_operator_domain locks lock Locks
make_operator_domain security security Security

# ============================================================
# CROSS-DOMAIN OPERATOR PANELS
# ============================================================

cat > src/application/operator/panels/LeasePaymentPanel.tsx <<'EOF'
export function LeasePaymentPanel({
  leaseId,
  paymentCount,
}: {
  leaseId: string
  paymentCount: number
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Lease / payment relationship
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Lease {leaseId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {paymentCount} payment records
      </div>
    </section>
  )
}
EOF

cat > src/application/operator/panels/PropertyLeasePanel.tsx <<'EOF'
export function PropertyLeasePanel({
  propertyId,
  leaseCount,
}: {
  propertyId: string
  leaseCount: number
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Property / lease relationship
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Property {propertyId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {leaseCount} leases
      </div>
    </section>
  )
}
EOF

cat > src/application/operator/panels/LeaseDevicePanel.tsx <<'EOF'
export function LeaseDevicePanel({
  leaseId,
  deviceCount,
}: {
  leaseId: string
  deviceCount: number
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Lease / device relationship
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Lease {leaseId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {deviceCount} devices
      </div>
    </section>
  )
}
EOF

cat > src/application/operator/panels/DeviceLockPanel.tsx <<'EOF'
export function DeviceLockPanel({
  deviceId,
  lockCount,
}: {
  deviceId: string
  lockCount: number
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Device / lock relationship
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Device {deviceId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {lockCount} locks
      </div>
    </section>
  )
}
EOF

cat > src/application/operator/panels/SecurityLockPanel.tsx <<'EOF'
export function SecurityLockPanel({
  lockId,
  permitted,
}: {
  lockId: string
  permitted: boolean
}) {
  return (
    <section className="rounded-xl border border-white/7 bg-kiri-950/55 p-5">
      <div className="text-sm font-bold text-kiri-text">
        Security / lock policy
      </div>
      <div className="mt-2 text-xs text-kiri-text-muted">
        Lock {lockId}
      </div>
      <div className="mt-1 text-sm font-bold text-kiri-text">
        {permitted ? "Policy satisfied" : "Policy blocked"}
      </div>
    </section>
  )
}
EOF

# ============================================================
# UNIFIED TIMELINE COMPONENTS
# ============================================================

cat > src/application/operator/timeline/UnifiedTimelineModel.ts <<'EOF'
export interface UnifiedTimelineModel {
  records: Array<{
    id: string
    domain: string
    title: string
    occurredAt: string
    severity: "info" | "warning" | "critical"
  }>
  total: number
}
EOF

cat > src/application/operator/timeline/buildUnifiedTimeline.ts <<'EOF'
import type { UnifiedTimelineModel } from "./UnifiedTimelineModel"

export function buildUnifiedTimeline(
  records: UnifiedTimelineModel["records"],
): UnifiedTimelineModel {
  const sorted = [...records].sort(
    (a, b) =>
      Date.parse(b.occurredAt) -
      Date.parse(a.occurredAt),
  )

  return {
    records: sorted,
    total: sorted.length,
  }
}
EOF

cat > src/application/operator/activity/UnifiedActivityModel.ts <<'EOF'
export interface UnifiedActivityModel {
  records: Array<{
    id: string
    domain: string
    action: string
    outcome: string
    occurredAt: string
  }>
  total: number
}
EOF

cat > src/application/operator/activity/buildUnifiedActivity.ts <<'EOF'
import type { UnifiedActivityModel } from "./UnifiedActivityModel"

export function buildUnifiedActivity(
  records: UnifiedActivityModel["records"],
): UnifiedActivityModel {
  const sorted = [...records].sort(
    (a, b) =>
      Date.parse(b.occurredAt) -
      Date.parse(a.occurredAt),
  )

  return {
    records: sorted,
    total: sorted.length,
  }
}
EOF

# ============================================================
# RUNTIME OPERATOR SURFACES
# ============================================================

cat > src/runtime/operator/runtimeOperatorSurface.ts <<'EOF'
export interface RuntimeOperatorSurface {
  id: string
  title: string
  domain: string
  enabled: boolean
  order: number
}
EOF

cat > src/runtime/operator/runtimeOperatorSurfaces.ts <<'EOF'
import type { RuntimeOperatorSurface } from "./runtimeOperatorSurface"

export const runtimeOperatorSurfaces:
  RuntimeOperatorSurface[] = [
  {
    id: "operations",
    title: "Operations",
    domain: "dashboard",
    enabled: true,
    order: 1,
  },
  {
    id: "properties",
    title: "Properties",
    domain: "property",
    enabled: true,
    order: 2,
  },
  {
    id: "leases",
    title: "Leases",
    domain: "lease",
    enabled: true,
    order: 3,
  },
  {
    id: "payments",
    title: "Payments",
    domain: "payment",
    enabled: true,
    order: 4,
  },
  {
    id: "devices",
    title: "Devices",
    domain: "device",
    enabled: true,
    order: 5,
  },
  {
    id: "locks",
    title: "Locks",
    domain: "lock",
    enabled: false,
    order: 6,
  },
  {
    id: "security",
    title: "Security",
    domain: "security",
    enabled: false,
    order: 7,
  },
]
EOF

cat > src/runtime/operator/panels/runtimePanelRegistry.ts <<'EOF'
export interface RuntimePanelDefinition {
  id: string
  domain: string
  title: string
  enabled: boolean
}

export const runtimePanelDefinitions:
  RuntimePanelDefinition[] = [
  {
    id: "dashboard.overview",
    domain: "dashboard",
    title: "Operations Overview",
    enabled: true,
  },
  {
    id: "property.occupancy",
    domain: "property",
    title: "Property Occupancy",
    enabled: true,
  },
  {
    id: "lease.lifecycle",
    domain: "lease",
    title: "Lease Lifecycle",
    enabled: true,
  },
  {
    id: "payment.settlement",
    domain: "payment",
    title: "Payment Settlement",
    enabled: true,
  },
  {
    id: "device.connectivity",
    domain: "device",
    title: "Device Connectivity",
    enabled: true,
  },
  {
    id: "lock.safety",
    domain: "lock",
    title: "Lock Safety",
    enabled: false,
  },
  {
    id: "security.safety",
    domain: "security",
    title: "Security Safety",
    enabled: false,
  },
]
EOF

cat > src/runtime/operator/workspaces/runtimeWorkspaceRegistry.ts <<'EOF'
import type {
  RuntimeOperatorSurface,
} from "../runtimeOperatorSurface"
import {
  runtimeOperatorSurfaces,
} from "../runtimeOperatorSurfaces"

export function getEnabledOperatorSurfaces():
  RuntimeOperatorSurface[] {
  return runtimeOperatorSurfaces
    .filter((item) => item.enabled)
    .sort((a, b) => a.order - b.order)
}
EOF

cat > src/runtime/operator/timeline/runtimeTimelineConfig.ts <<'EOF'
export const runtimeTimelineConfig = {
  maxRecords: 250,
  defaultSeverity: "info" as
    | "info"
    | "warning"
    | "critical",
  newestFirst: true,
}
EOF

cat > src/runtime/operator/activity/runtimeActivityConfig.ts <<'EOF'
export const runtimeActivityConfig = {
  maxRecords: 250,
  includeBlocked: true,
  includeFailed: true,
  includeCompleted: true,
}
EOF

# ============================================================
# INVENTORY
# ============================================================

echo
echo "============================================================"
echo "PHASE 10H COMPLETE"
echo "============================================================"
echo "Build: NOT RUN"
echo "Tests: NOT CREATED"
echo
echo "TOTAL SOURCE FILES:"
find src -type f | wc -l

echo
echo "10H LAYER COUNTS"
echo "------------------------------------------------------------"

printf "%-35s %s\n" \
  "Application operator" \
  "$(find src/application/operator -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Timeline core" \
  "$(find src/application/timeline -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Activity core" \
  "$(find src/application/activity -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Relation graph" \
  "$(find src/application/relations -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Metrics" \
  "$(find src/application/metrics -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Domain operator surfaces" \
  "$(find src/features/*/operator -type f 2>/dev/null | wc -l)"

printf "%-35s %s\n" \
  "Runtime operator" \
  "$(find src/runtime/operator -type f 2>/dev/null | wc -l)"

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
echo "NEXT: PHASE 10I"
echo "FRONTEND OPERATIONAL CONTROL PLANE + RESOURCE LIFECYCLES"
echo "============================================================"
