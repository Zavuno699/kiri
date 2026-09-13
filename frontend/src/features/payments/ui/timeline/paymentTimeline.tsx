import { ActivityTimeline } from "../../../../components/operator/timeline/ActivityTimeline"

export function PaymentTimeline({
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
