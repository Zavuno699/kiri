export interface WorkspaceBindingEvent {
  type:
    | "binding.started"
    | "binding.loaded"
    | "binding.refreshed"
    | "binding.degraded"
    | "binding.failed"
  domain: string
  pageId: string
  occurredAt: string
}
