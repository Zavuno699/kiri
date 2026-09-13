import { createAuditEvent } from "../factory/createAuditEvent";
import { appendAuditEvent } from "../store/auditStore";

export function recordNavigationAudit(input: {
  path: string;
  outcome: "success" | "denied";
  principal: string | null;
  sessionId: string | null;
  reason?: string | null;
  capability?: string | null;
}): void {
  appendAuditEvent(
    createAuditEvent({
      category: "navigation",
      action: "route-access",
      outcome: input.outcome,
      principal: input.principal,
      sessionId: input.sessionId,
      capability: input.capability ?? null,
      reason: input.reason ?? null,
      metadata: {
        path: input.path,
      },
    }),
  );
}
