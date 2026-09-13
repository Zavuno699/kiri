import type { AuditEvent } from "../../../application/audit/auditEvent";

export function selectLocksDeniedAudit(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.resourceType === "locks" &&
      event.outcome === "denied",
  );
}
