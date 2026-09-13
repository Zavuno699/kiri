import type {
  WorkflowResult,
} from "../contracts/workflowResult";

import {
  recordStateAudit,
} from "../../observability/runtime/recordStateAudit";

export function auditWorkflowResult(
  result: WorkflowResult,
): string {
  return recordStateAudit({
    action:
      `workflow:${result.workflowId}`,
    domain:
      "global",
    entityId:
      null,
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
        : `Workflow ${result.outcome}.`,
  });
}
