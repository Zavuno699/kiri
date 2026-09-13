import { createAuditEvent } from "../factory/createAuditEvent";
import { appendAuditEvent } from "../store/auditStore";

export function recordAuthenticationAudit(input: {
  action:
    | "sign-in"
    | "sign-out"
    | "reauthentication"
    | "session-refresh";
  outcome:
    | "success"
    | "failed"
    | "expired";
  principal: string | null;
  sessionId: string | null;
  reason?: string | null;
}): void {
  appendAuditEvent(
    createAuditEvent({
      category: "authentication",
      action: input.action,
      outcome: input.outcome,
      principal: input.principal,
      sessionId: input.sessionId,
      reason: input.reason ?? null,
    }),
  );
}
