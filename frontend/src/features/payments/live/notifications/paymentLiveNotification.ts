export interface PaymentLiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function createPaymentLiveNotification(
  level: PaymentLiveNotification["level"],
  title: string,
  message: string,
): PaymentLiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
