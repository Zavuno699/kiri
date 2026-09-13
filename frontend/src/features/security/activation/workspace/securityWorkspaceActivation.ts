import type { WorkspaceActivation } from "../../../../application/page-activation/workspaces/workspaceActivation"

export const securityWorkspaceActivation:
  WorkspaceActivation = {
  id: "security.workspace",
  domain: "security",
  pageId: "security.workspace",
  enabled: false,
  readOnly: true,
}
