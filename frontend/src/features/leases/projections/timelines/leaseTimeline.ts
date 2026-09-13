export interface LeaseTimelineItem {
  id: string
  type: string
  title: string
  occurredAt: string
  severity: "info" | "warning" | "critical"
}
