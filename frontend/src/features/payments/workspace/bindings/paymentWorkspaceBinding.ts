import type { WorkspaceBinding } from "../../../../application/workspace-binding/core/workspaceBinding"

export function createPaymentWorkspaceBinding():
  WorkspaceBinding {
  return {
    id: "payments.workspace",
    domain: "payments",
    pageId: "payment.workspace",
    loading: false,
    refreshing: false,
    degraded: true ? false : true,
    error:
      true
        ? undefined
        : "Production capability is not verified.",
  }
}
