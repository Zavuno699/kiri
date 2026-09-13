export interface CommandPipelineContext {
  commandId: string
  domain: string
  type: string
  correlationId: string
  readOnly: boolean
}
