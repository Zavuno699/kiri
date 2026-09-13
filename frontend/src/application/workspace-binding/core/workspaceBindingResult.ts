export interface WorkspaceBindingResult<T = unknown> {
  ok: boolean
  data?: T
  error?: string
  correlationId?: string
}
