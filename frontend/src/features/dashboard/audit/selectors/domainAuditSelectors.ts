import type { AuditEvent } from "../../../application/audit/auditEvent";

export function selectDashboardDeniedAudit(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.resourceType === "dashboard" &&
      event.outcome === "denied",
  );
}
