import { KpiCard } from "../../../components/data-display/KpiCard"
import type { SecurityMetrics } from "../types/securityMetrics"

export function SecurityMetricGrid({
  metrics,
}: {
  metrics: SecurityMetrics
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
      <KpiCard
        eyebrow="Credentials"
        label="Active"
        value={metrics.activeCredentials.toLocaleString()}
        footnote="Valid credentials"
        accent="green"
      />

      <KpiCard
        eyebrow="Credentials"
        label="Revoked"
        value={metrics.revokedCredentials.toLocaleString()}
        footnote="Invalidated"
        accent="red"
      />

      <KpiCard
        eyebrow="Credentials"
        label="Expired"
        value={metrics.expiredCredentials.toLocaleString()}
        footnote="Past expiry"
        accent="amber"
      />

      <KpiCard
        eyebrow="Access"
        label="Restricted"
        value={metrics.restrictedAccess.toLocaleString()}
        footnote="Restricted access"
        accent="amber"
      />

      <KpiCard
        eyebrow="Access"
        label="Frozen"
        value={metrics.frozenAccess.toLocaleString()}
        footnote="Frozen access"
        accent="red"
      />

      <KpiCard
        eyebrow="Events"
        label="Critical"
        value={metrics.criticalEvents.toLocaleString()}
        footnote="Critical events"
        accent="red"
      />
    </div>
  )
}
