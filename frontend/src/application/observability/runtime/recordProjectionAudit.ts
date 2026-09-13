import {
  appendAuditRecord,
} from "../audit/auditStore";

export function recordProjectionAudit(input: {
  projectionId: string;
  domain: string;
  entityId: string | null;
  correlationId: string | null;
  message: string;
}): string {
  const id =
    `audit-projection-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  appendAuditRecord({
    id,
    category:
      "projection",
    action:
      input.projectionId,
    domain:
      input.domain,
    entityId:
      input.entityId,
    actor:
      "projection-runtime",
    correlationId:
      input.correlationId,
    causationId:
      null,
    outcome:
      "success",
    message:
      input.message,
    occurredAt:
      new Date().toISOString(),
  });

  return id;
}
