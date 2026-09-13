export interface SecurityWorkspaceEvent {
  type:
    | "security.workspace.loaded"
    | "security.workspace.refreshed"
    | "security.workspace.degraded"
  occurredAt: string
}
