export interface WorkspaceBindingRequest {
  domain: string
  pageId: string
  entityId?: string
  query?: Record<string, unknown>
  correlationId?: string
}
