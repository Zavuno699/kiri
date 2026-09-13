export interface SecurityEvent<T = unknown> {
  id: string
  type: string
  domain: "security"
  payload: T
  occurredAt: string
  correlationId?: string
}
