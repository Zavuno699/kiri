import type { AuditEvent } from "../auditEvent";

export function createAuditEvent(
  input: Omit<AuditEvent, "id" | "occurredAt">,
): AuditEvent {
  return {
    ...input,
    id: crypto.randomUUID(),
    occurredAt: new Date().toISOString(),
  };
}
