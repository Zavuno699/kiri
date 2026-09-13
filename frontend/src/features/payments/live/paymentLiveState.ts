export interface PaymentLiveState {
  domain: "payments"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initialPaymentLiveState:
  PaymentLiveState = {
  domain: "payments",
  connected: true,
  stale: false,
  degraded: true ? false : true,
}
