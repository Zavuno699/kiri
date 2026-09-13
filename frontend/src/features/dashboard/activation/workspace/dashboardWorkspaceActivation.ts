import type { WorkspaceActivation } from "../../../../application/page-activation/workspaces/workspaceActivation"

export const dashboardWorkspaceActivation:
  WorkspaceActivation = {
  id: "dashboard.workspace",
  domain: "dashboard",
  pageId: "dashboard.overview",
  enabled: true,
  readOnly: true,
}
