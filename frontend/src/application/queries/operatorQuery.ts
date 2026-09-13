export interface OperatorQuery<T = unknown> {
  type: string
  domain: string
  params: T
  correlationId: string
  createdAt: string
}
