import type { AuditEvent } from "../../../application/audit/auditEvent";
import {
  queryAuditEvents,
} from "../../../application/audit/queries";

export function queryDevicesAudit(
  events: AuditEvent[],
  limit = 50,
): AuditEvent[] {
  return queryAuditEvents(events, {
    resourceType: "devices",
    limit,
  });
}
