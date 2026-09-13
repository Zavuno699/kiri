import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function createDashboardWorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "dashboard.workspace",
    domain: "dashboard",
    pageId: "dashboard.workspace",
    loading: false,
    refreshing: false,
    degraded: true ? false : true,
    error:
      true
        ? undefined
        : "Production capability is not verified.",
  }
}
