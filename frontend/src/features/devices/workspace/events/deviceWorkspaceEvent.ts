export interface DeviceWorkspaceEvent {
  type:
    | "devices.workspace.loaded"
    | "devices.workspace.refreshed"
    | "devices.workspace.degraded"
  occurredAt: string
}
