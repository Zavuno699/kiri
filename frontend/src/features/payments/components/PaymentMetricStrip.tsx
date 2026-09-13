import { KpiCard } from "../../../components/data-display/KpiCard"
import type { PaymentMetrics } from "../types/paymentMetrics"
import { formatCurrency } from "../../../lib/formatting/currency"

export function PaymentMetricStrip({
  metrics,
}: {
  metrics: PaymentMetrics
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <KpiCard
        eyebrow="Ledger"
        label="Payments"
        value={metrics.count.toLocaleString()}
        footnote="Recorded payments"
        accent="blue"
      />

      <KpiCard
        eyebrow="Settlement"
        label="Settled"
        value={metrics.settled.toLocaleString()}
        footnote="Completed payments"
        accent="green"
      />

      <KpiCard
        eyebrow="Settlement"
        label="Pending"
        value={metrics.pending.toLocaleString()}
        footnote="Awaiting completion"
        accent="amber"
      />

      <KpiCard
        eyebrow="Exceptions"
        label="Failed"
        value={metrics.failed.toLocaleString()}
        footnote="Failed or reversed"
        accent="red"
      />

      <KpiCard
        eyebrow="Volume"
        label="Settled value"
        value={formatCurrency(metrics.settledValueUGX)}
        footnote={`${metrics.reconciled} reconciled`}
        accent="purple"
      />
    </div>
  )
}
