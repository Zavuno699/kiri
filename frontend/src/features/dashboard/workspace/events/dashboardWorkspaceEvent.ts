export interface DashboardWorkspaceEvent {
  type:
    | "dashboard.workspace.loaded"
    | "dashboard.workspace.refreshed"
    | "dashboard.workspace.degraded"
  occurredAt: string
}
