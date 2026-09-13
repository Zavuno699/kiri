import type { WorkspaceActivation } from "../../../../application/page-activation/workspaces/workspaceActivation"

export const paymentWorkspaceActivation:
  WorkspaceActivation = {
  id: "payments.workspace",
  domain: "payments",
  pageId: "payment.list",
  enabled: true,
  readOnly: true,
}
