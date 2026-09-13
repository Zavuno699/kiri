import type { AuditEvent } from "../../../application/audit/auditEvent";

export function selectPaymentsDeniedAudit(
  events: AuditEvent[],
): AuditEvent[] {
  return events.filter(
    (event) =>
      event.resourceType === "payments" &&
      event.outcome === "denied",
  );
}
