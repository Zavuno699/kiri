export interface SecurityTimelineItem {
  id: string
  type: string
  title: string
  occurredAt: string
  severity: "info" | "warning" | "critical"
}
