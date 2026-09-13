import {
  appendAuditRecord,
} from "../audit/auditStore";

export function recordEventAudit(input: {
  eventType: string;
  domain: string;
  entityId: string | null;
  correlationId: string | null;
  causationId: string | null;
  message: string;
}): string {
  const id =
    `audit-event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  appendAuditRecord({
    id,
    category:
      "event",
    action:
      input.eventType,
    domain:
      input.domain,
    entityId:
      input.entityId,
    actor:
      "event-stream",
    correlationId:
      input.correlationId,
    causationId:
      input.causationId,
    outcome:
      "observed",
    message:
      input.message,
    occurredAt:
      new Date().toISOString(),
  });

  return id;
}
