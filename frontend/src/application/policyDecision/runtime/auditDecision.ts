import {
  recordStateAudit,
} from "../../observability/runtime/recordStateAudit";

import type {
  PolicyDecision,
} from "../contracts/policyDecision";

export function auditPolicyDecision(
  decision: PolicyDecision,
): string {
  return recordStateAudit({
    action:
      `policy:${decision.action}`,
    domain:
      decision.domain,
    entityId:
      decision.entityId,
    correlationId:
      decision.correlationId,
    outcome:
      decision.allowed
        ? "success"
        : decision.outcome ===
            "blocked"
          ? "blocked"
          : "failed",
    message:
      decision.reasons.length
        ? decision.reasons.join(
            " | ",
          )
        : "Policy decision allowed.",
  });
}
