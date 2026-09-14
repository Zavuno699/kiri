import { createAuditEvent } from "../factory/createAuditEvent";
import { appendAuditEvent } from "../store/auditStore";

export function recordOperatorAudit(input: {
  action: string;
  outcome: "success" | "denied" | "failed" | "cancelled";
  principal: string | null;
  sessionId: string | null;
  metadata?: Record<string, unknown>;
}): void {
  appendAuditEvent(
    createAuditEvent({
      category: "operator",
      action: input.action,
      outcome: input.outcome,
      principal: input.principal,
      sessionId: input.sessionId ?? undefined,
      metadata: input.metadata,
    }),
  );
}
