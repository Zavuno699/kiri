import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function createDeviceWorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "devices.workspace",
    domain: "devices",
    pageId: "device.workspace",
    loading: false,
    refreshing: false,
    degraded: true ? false : true,
    error:
      true
        ? undefined
        : "Production capability is not verified.",
  }
}
