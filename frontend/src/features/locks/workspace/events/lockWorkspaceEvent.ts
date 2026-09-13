export interface LockWorkspaceEvent {
  type:
    | "locks.workspace.loaded"
    | "locks.workspace.refreshed"
    | "locks.workspace.degraded"
  occurredAt: string
}
