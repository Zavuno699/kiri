export interface LeaseEvent<T = unknown> {
  id: string
  type: string
  domain: "leases"
  payload: T
  occurredAt: string
  correlationId?: string
}
