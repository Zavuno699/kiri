export interface OperatorEvent<T = unknown> {
  id: string
  type: string
  domain: string
  payload: T
  occurredAt: string
  correlationId?: string
}
