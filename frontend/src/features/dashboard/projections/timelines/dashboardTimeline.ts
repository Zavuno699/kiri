export interface DashboardTimelineItem {
  id: string
  type: string
  title: string
  occurredAt: string
  severity: "info" | "warning" | "critical"
}
