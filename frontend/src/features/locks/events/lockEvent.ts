export interface LockEvent<T = unknown> {
  id: string
  type: string
  domain: "locks"
  payload: T
  occurredAt: string
  correlationId?: string
}
