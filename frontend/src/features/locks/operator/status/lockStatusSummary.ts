export interface LockStatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
