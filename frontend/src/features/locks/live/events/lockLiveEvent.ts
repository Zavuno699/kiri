export interface LockLiveEvent<T = unknown> {
  id: string
  domain: "locks"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
