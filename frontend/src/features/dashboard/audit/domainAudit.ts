import type { AuditEvent } from "../../../application/audit/auditEvent";
import {
  queryAuditEvents,
} from "../../../application/audit/queries";

export function queryDashboardAudit(
  events: AuditEvent[],
  limit = 50,
): AuditEvent[] {
  return queryAuditEvents(events, {
    resourceType: "dashboard",
    limit,
  });
}
