import {
  recordStateAudit,
} from "../runtime/recordStateAudit";

export function observeStateChange(
  action: string,
  domain: string,
  entityId: string | null,
  correlationId: string | null,
  outcome:
    | "success"
    | "blocked"
    | "failed"
    | "observed",
  message: string,
) {
  return recordStateAudit({
    action,
    domain,
    entityId,
    correlationId,
    outcome,
    message,
  });
}
