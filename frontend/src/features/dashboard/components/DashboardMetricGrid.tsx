import { KpiCard } from "../../../components/data-display/KpiCard"
import type { DashboardMetric } from "../types/dashboardMetric"

export function DashboardMetricGrid({
  metrics,
}: {
  metrics: DashboardMetric[]
}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => (
        <KpiCard
          key={metric.key}
          eyebrow={metric.label}
          label={metric.label}
          value={metric.value}
          footnote={metric.delta ?? "Operational metric"}
          accent={metric.tone ?? "blue"}
        />
      ))}
    </div>
  )
}
