export interface ActionWorkflowContext {
  commandId: string
  domain: string
  entityId?: string
  state: string
  progress: number
  message?: string
}
