export interface SecurityLiveEvent<T = unknown> {
  id: string
  domain: "security"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
