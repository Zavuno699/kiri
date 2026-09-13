import type { AuditEvent } from "../../../application/audit/auditEvent";

export function selectLeasesDeniedAudit(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.resourceType === "leases" &&
      event.outcome === "denied",
  );
}
