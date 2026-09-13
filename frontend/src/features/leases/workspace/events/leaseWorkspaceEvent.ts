export interface LeaseWorkspaceEvent {
  type:
    | "leases.workspace.loaded"
    | "leases.workspace.refreshed"
    | "leases.workspace.degraded"
  occurredAt: string
}
