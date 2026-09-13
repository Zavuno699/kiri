export interface PropertyLiveEvent<T = unknown> {
  id: string
  domain: "properties"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
