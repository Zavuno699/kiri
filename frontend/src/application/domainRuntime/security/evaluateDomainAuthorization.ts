import {
  authorizeCapability,
} from "../../security/core/securityAuthorizationService";

import type {
  DomainRuntimeDecision,
} from "../contracts/domainRuntimeDecision";

export function evaluateDomainAuthorization(
  domain: string,
  action: string,
  capability: string,
): DomainRuntimeDecision {
  const decision =
    authorizeCapability(
      capability,
    );

  return {
    domain,
    action,
    allowed:
      decision.decision ===
      "allow",
    capability,
    reason:
      decision.reason,
    evaluatedAt:
      decision.evaluatedAt,
  };
}
