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
      sessionId: input.sessionId ?? undefined,
      capability: input.capability ?? undefined,
      resourceType: input.resourceType ?? undefined,
      resourceId: input.resourceId ?? undefined,
      command: input.command,
      reason: input.reason ?? undefined,
      correlationId: input.correlationId ?? undefined,
      causationId: input.causationId ?? undefined,
    }),
  );
}
