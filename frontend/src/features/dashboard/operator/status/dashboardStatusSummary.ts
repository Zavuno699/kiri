export interface DashboardStatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
