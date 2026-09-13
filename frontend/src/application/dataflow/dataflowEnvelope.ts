export interface DataflowEnvelope<T = unknown> {
  id: string
  domain: string
  type: string
  version: number
  payload: T
  correlationId: string
  causationId?: string
  occurredAt: string
}
