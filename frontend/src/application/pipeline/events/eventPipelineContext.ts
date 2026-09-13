export interface EventPipelineContext {
  eventId: string
  domain: string
  type: string
  correlationId: string
  causationId?: string
}
