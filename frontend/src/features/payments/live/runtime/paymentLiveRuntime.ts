export interface PaymentLiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const paymentLiveRuntime:
  PaymentLiveRuntime = {
  enabled: true,
  subscribed: false,
  eventCount: 0,
}
