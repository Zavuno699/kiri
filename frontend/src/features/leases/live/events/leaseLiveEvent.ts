export interface LeaseLiveEvent<T = unknown> {
  id: string
  domain: "leases"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
