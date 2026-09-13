export interface DashboardEventProjection {
  id: string
  title: string
  detail: string
  severity: "info" | "warning" | "critical"
  occurredAt: string
}
