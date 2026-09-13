import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function createLockWorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "locks.workspace",
    domain: "locks",
    pageId: "lock.workspace",
    loading: false,
    refreshing: false,
    degraded: false ? false : true,
    error:
      false
        ? undefined
        : "Production capability is not verified.",
  }
}
