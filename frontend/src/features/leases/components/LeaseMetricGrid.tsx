import { PropertyMetricCard } from "../../properties/components/PropertyMetricCard"
import type { LeaseMetrics } from "../types/leaseMetrics"

export function LeaseMetricGrid({
  metrics,
}: {
  metrics: LeaseMetrics
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <PropertyMetricCard
        label="Active"
        value={metrics.active.toLocaleString()}
        detail="Active leases"
      />

      <PropertyMetricCard
        label="Pending"
        value={metrics.pending.toLocaleString()}
        detail="Awaiting activation"
      />

      <PropertyMetricCard
        label="Expired"
        value={metrics.expired.toLocaleString()}
        detail="Expired agreements"
      />

      <PropertyMetricCard
        label="Delinquent"
        value={metrics.delinquent.toLocaleString()}
        detail="Payment exceptions"
      />

      <PropertyMetricCard
        label="Frozen"
        value={metrics.frozen.toLocaleString()}
        detail="Access restrictions"
      />
    </div>
  )
}
