import type { AuditEvent } from "../../../application/audit/auditEvent";

export function selectDevicesDeniedAudit(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.resourceType === "devices" &&
      event.outcome === "denied",
  );
}
