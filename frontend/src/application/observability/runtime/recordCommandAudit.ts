import {
  appendAuditRecord,
} from "../audit/auditStore";

export function recordCommandAudit(input: {
  commandId: string;
  domain: string;
  entityId: string | null;
  correlationId: string | null;
  outcome:
    | "success"
    | "blocked"
    | "failed";
  message: string;
}): string {
  const id =
    `audit-command-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  appendAuditRecord({
    id,
    category:
      "command",
    action:
      input.commandId,
    domain:
      input.domain,
    entityId:
      input.entityId,
    actor:
      "frontend-control-plane",
    correlationId:
      input.correlationId,
    causationId:
      null,
    outcome:
      input.outcome,
    message:
      input.message,
    occurredAt:
      new Date().toISOString(),
  });

  return id;
}
