import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function createLeaseWorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "leases.workspace",
    domain: "leases",
    pageId: "lease.workspace",
    loading: false,
    refreshing: false,
    degraded: true ? false : true,
    error:
      true
        ? undefined
        : "Production capability is not verified.",
  }
}
