export interface PropertyStatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
