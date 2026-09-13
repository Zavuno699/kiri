
import type { AuthorizationRequest } from "./authorizationRequest";
import type { AuthorizationResult } from "./authorizationDecision";

export function authorize(
  request: AuthorizationRequest,
): AuthorizationResult {
  if (!request.principal) {
    return {
      decision: "deny",
      allowed: false,
      reason: "missing-principal",
      capability: request.capability,
    };
  }

  if (!request.capability) {
    return {
      decision: "deny",
      allowed: false,
      reason: "missing-capability",
      capability: request.capability,
    };
  }

  return {
    decision: "allow",
    allowed: true,
    reason: "authorization-request-accepted",
    capability: request.capability,
  };
}

