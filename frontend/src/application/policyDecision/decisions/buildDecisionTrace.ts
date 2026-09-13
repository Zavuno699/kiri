import type {
  DecisionTrace,
} from "../contracts/decisionTrace";

import type {
  PolicyDecision,
} from "../contracts/policyDecision";

export function buildDecisionTrace(
  decision: PolicyDecision,
): DecisionTrace {
  const denied =
    decision.outcome ===
      "deny" ||
    decision.outcome ===
      "blocked";

  return {
    decisionId:
      decision.id,

    authorization:
      decision.reasons.some(
        (reason) =>
          reason.includes(
            "Authentication",
          ) ||
          reason.includes(
            "Capability",
          ) ||
          reason.includes(
            "Domain access",
          ),
      )
        ? "fail"
        : "pass",

    policy:
      decision.policyIds.length >
      0
        ? denied
          ? "fail"
          : "pass"
        : "unknown",

    risk:
      decision.risk.level ===
        "critical" &&
      !decision.risk.requiresElevation
        ? "fail"
        : "pass",

    guards:
      decision.guardIds.length >
      0
        ? decision.reasons.some(
            (reason) =>
              reason.includes(
                "guard",
              ),
          )
          ? "fail"
          : "pass"
        : "unknown",

    final:
      decision.outcome,

    reasons:
      decision.reasons,
  };
}
