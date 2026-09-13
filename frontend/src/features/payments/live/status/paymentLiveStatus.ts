export interface PaymentLiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function paymentLiveStatus(
  degraded = false,
): PaymentLiveStatus {
  return {
    status:
      !true
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
