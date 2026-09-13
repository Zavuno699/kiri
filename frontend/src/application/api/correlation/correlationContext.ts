export interface CorrelationContext {
  correlationId: string
  causationId?: string
  requestId?: string
}
