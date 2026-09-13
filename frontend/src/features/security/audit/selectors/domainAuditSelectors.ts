import type { AuditEvent } from "../../../application/audit/auditEvent";

export function selectSecurityDeniedAudit(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.resourceType === "security" &&
      event.outcome === "denied",
  );
}
