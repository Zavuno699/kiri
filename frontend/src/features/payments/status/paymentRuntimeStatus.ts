export interface PaymentRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const paymentRuntimeStatus: PaymentRuntimeStatus = {
  available: true,
  degraded: false,
}
