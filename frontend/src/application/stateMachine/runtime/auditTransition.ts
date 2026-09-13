import type {
  TransitionResult,
} from "../contracts/transitionResult";

import {
  recordStateAudit,
} from "../../observability/runtime/recordStateAudit";

export function auditTransition(
  domain: string,
  result: TransitionResult,
): string {
  return recordStateAudit({
    action:
      `transition:${result.transitionId}`,
    domain,
    entityId:
      result.entityId,
    correlationId:
      result.correlationId,
    outcome:
      result.outcome ===
        "completed"
        ? "success"
        : result.outcome ===
            "blocked"
          ? "blocked"
          : "failed",
    message:
      result.reasons.length
        ? result.reasons.join(
            " | ",
          )
        : `${result.fromState} → ${result.toState}`,
  });
}
