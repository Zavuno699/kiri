import type { AuditEvent } from "../../../../application/audit/auditEvent";

export function selectPropertiesDeniedAudit(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.resourceType === "properties" &&
      event.outcome === "denied",
  );
}
