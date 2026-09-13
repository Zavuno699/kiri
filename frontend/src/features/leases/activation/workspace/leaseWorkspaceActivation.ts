import type { WorkspaceActivation } from "../../../../application/page-activation/workspaces/workspaceActivation"

export const leaseWorkspaceActivation:
  WorkspaceActivation = {
  id: "leases.workspace",
  domain: "leases",
  pageId: "lease.list",
  enabled: true,
  readOnly: true,
}
