import {
  recordCommandAudit,
} from "../runtime/recordCommandAudit";

export function observeCommandOutcome(
  commandId: string,
  domain: string,
  entityId: string | null,
  correlationId: string | null,
  outcome:
    | "success"
    | "blocked"
    | "failed",
  message: string,
) {
  return recordCommandAudit({
    commandId,
    domain,
    entityId,
    correlationId,
    outcome,
    message,
  });
}
