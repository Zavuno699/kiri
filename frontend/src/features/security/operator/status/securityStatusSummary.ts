export interface SecurityStatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
