export interface PaymentStatusSummary {
  status: "healthy" | "degraded" | "failed"
  reason?: string
}
