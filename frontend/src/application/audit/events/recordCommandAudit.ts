import { createAuditEvent } from "../factory/createAuditEvent";
import { appendAuditEvent } from "../store/auditStore";

export function recordCommandAudit(input: {
  command: string;
  outcome: "success" | "denied" | "failed" | "cancelled";
  principal: string | null;
  sessionId: string | null;
  capability?: string | null;
  resourceType?: string | null;
  resourceId?: string | null;
  reason?: string | null;
  correlationId?: string | null;
  causationId?: string | null;
}): void {
  appendAuditEvent(
    createAuditEvent({
      category: "command",
      action: input.command,
      outcome: input.outcome,
      principal: input.principal,
      sessionId: input.sessionId,
      capability: input.capability ?? null,
      resourceType: input.resourceType ?? null,
      resourceId: input.resourceId ?? null,
      command: input.command,
      reason: input.reason ?? null,
      correlationId: input.correlationId ?? null,
      causationId: input.causationId ?? null,
    }),
  );
}
