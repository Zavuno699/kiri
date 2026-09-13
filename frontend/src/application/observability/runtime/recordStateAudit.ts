import {
  appendAuditRecord,
} from "../audit/auditStore";

export function recordStateAudit(input: {
  action: string;
  domain: string;
  entityId: string | null;
  correlationId: string | null;
  outcome:
    | "success"
    | "blocked"
    | "failed"
    | "observed";
  message: string;
}): string {
  const id =
    `audit-state-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  appendAuditRecord({
    id,
    category:
      "state",
    action:
      input.action,
    domain:
      input.domain,
    entityId:
      input.entityId,
    actor:
      "state-runtime",
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
