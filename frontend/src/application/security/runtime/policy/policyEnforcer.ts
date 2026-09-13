import type { PolicyEnforcementRequest } from "./enforcementRequest";
import type { PolicyEnforcementResult } from "./enforcementResult";

export function enforceSecurityPolicy(
  request: PolicyEnforcementRequest,
): PolicyEnforcementResult {
  if (!request.principal) {
    return {
      allowed: false,
      effect: "deny",
      reason: "principal-unavailable",
      capability: request.capability,
    };
  }

  if (!request.authenticated) {
    return {
      allowed: false,
      effect: "deny",
      reason: "authentication-required",
      capability: request.capability,
    };
  }

  if (!request.sessionActive) {
    return {
      allowed: false,
      effect: "deny",
      reason: "active-session-required",
      capability: request.capability,
    };
  }

  if (request.frozen) {
    return {
      allowed: false,
      effect: "deny",
      reason: "security-freeze-active",
      capability: request.capability,
    };
  }

  return {
    allowed: true,
    effect: "allow",
    reason: "security-policy-satisfied",
    capability: request.capability,
  };
}
