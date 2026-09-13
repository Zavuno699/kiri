export interface DashboardTimelineEvent {
  id: string
  category: string
  title: string
  severity: "info" | "warning" | "critical"
  occurredAt: string
}
