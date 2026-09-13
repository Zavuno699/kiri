export interface PropertyWorkspaceEvent {
  type:
    | "properties.workspace.loaded"
    | "properties.workspace.refreshed"
    | "properties.workspace.degraded"
  occurredAt: string
}
