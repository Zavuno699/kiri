
import type { PolicyContext } from "./policyContext";
import type { PolicyDecision } from "./policyDecision";

export function evaluatePolicy(
  context: PolicyContext,
): PolicyDecision {
  if (!context.subject.authenticated) {
    return {
      allowed: false,
      effect: "deny",
      reason: "authentication-required",
      policy: "default-deny",
    };
  }

  if (context.action.dangerous && context.subject.roles.length === 0) {
    return {
      allowed: false,
      effect: "deny",
      reason: "privileged-role-required",
      policy: "default-deny",
    };
  }

  return {
    allowed: true,
    effect: "allow",
    reason: "policy-evaluated",
    policy: "default-allow-after-authentication",
  };
}

