export interface DashboardAlert {
  id: string
  severity: "info" | "warning" | "critical"
  title: string
  message: string
  occurredAt: string
  acknowledged?: boolean
}
