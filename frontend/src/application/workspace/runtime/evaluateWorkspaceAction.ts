import {
  authorizeCapability,
} from "../../security/core/securityAuthorizationService";

import type {
  WorkspaceAction,
} from "../contracts/workspaceAction";

export function evaluateWorkspaceAction(
  action: WorkspaceAction,
): WorkspaceAction {
  const decision =
    authorizeCapability(
      action.capability,
    );

  return {
    ...action,
    available:
      action.available &&
      decision.decision ===
        "allow",
  };
}
