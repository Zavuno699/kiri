export interface PaymentLiveEvent<T = unknown> {
  id: string
  domain: "payments"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
