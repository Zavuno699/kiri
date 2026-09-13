import { createAuditEvent } from "../factory/createAuditEvent";
import { appendAuditEvent } from "../store/auditStore";

export function recordAuthorizationAudit(input: {
  action: "capability-check" | "policy-check";
  outcome: "success" | "denied" | "failed";
  principal: string | null;
  sessionId: string | null;
  capability: string;
  resourceType?: string | null;
  resourceId?: string | null;
  reason?: string | null;
  correlationId?: string | null;
}): void {
  appendAuditEvent(
    createAuditEvent({
      category: "authorization",
      action: input.action,
      outcome: input.outcome,
      principal: input.principal,
      sessionId: input.sessionId,
      capability: input.capability,
      resourceType: input.resourceType ?? null,
      resourceId: input.resourceId ?? null,
      reason: input.reason ?? null,
      correlationId: input.correlationId ?? null,
    }),
  );
}
