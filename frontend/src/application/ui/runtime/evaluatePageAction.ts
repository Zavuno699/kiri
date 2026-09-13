import {
  authorizeCapability,
} from "../../security/core/securityAuthorizationService";

import type {
  PageAction,
} from "../contracts/pageAction";

export function evaluatePageAction(
  action: PageAction,
): PageAction {
  const decision =
    authorizeCapability(
      action.capability,
    );

  return {
    ...action,
    enabled:
      action.enabled &&
      decision.decision ===
        "allow",
  };
}
