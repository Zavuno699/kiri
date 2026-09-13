export interface PaymentEvent<T = unknown> {
  id: string
  type: string
  domain: "payments"
  payload: T
  occurredAt: string
  correlationId?: string
}
