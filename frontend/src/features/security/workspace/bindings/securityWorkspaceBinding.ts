import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function createSecurityWorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "security.workspace",
    domain: "security",
    pageId: "security.workspace",
    loading: false,
    refreshing: false,
    degraded: false ? false : true,
    error:
      false
        ? undefined
        : "Production capability is not verified.",
  }
}
