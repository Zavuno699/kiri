export interface CommandEnvelope<T = unknown> {
  commandId: string
  commandType: string
  issuedAt: string
  correlationId?: string
  causationId?: string
  operatorId?: string
  reason?: string
  payload: T
}
