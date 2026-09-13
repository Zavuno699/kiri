import type { WorkspaceActivation } from "../../../../application/page-activation/workspaces/workspaceActivation"

export const lockWorkspaceActivation:
  WorkspaceActivation = {
  id: "locks.workspace",
  domain: "locks",
  pageId: "lock.workspace",
  enabled: false,
  readOnly: true,
}
