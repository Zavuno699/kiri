export interface EventEnvelope<T = unknown> {
  id: string
  type: string
  version: number
  occurredAt: string
  correlationId?: string
  causationId?: string
  producer?: string
  payload: T
}
