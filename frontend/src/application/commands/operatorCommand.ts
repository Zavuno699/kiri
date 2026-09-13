export interface OperatorCommand<T = unknown> {
  id: string
  type: string
  domain: string
  payload: T
  correlationId: string
  createdAt: string
}
