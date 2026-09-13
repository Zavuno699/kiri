export interface LeaseStatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
