export interface PropertyEvent<T = unknown> {
  id: string
  type: string
  domain: "properties"
  payload: T
  occurredAt: string
  correlationId?: string
}
