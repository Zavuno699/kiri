import { MetricGrid } from "../../../../components/operator/metrics/MetricGrid"

export function PaymentMetrics({
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
