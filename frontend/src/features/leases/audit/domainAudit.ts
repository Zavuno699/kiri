import type { AuditEvent } from "../../../application/audit/auditEvent";
import {
  queryAuditEvents,
} from "../../../application/audit/queries";

export function queryLeasesAudit(
  events: AuditEvent[],
  limit = 50,
): AuditEvent[] {
  return queryAuditEvents(events, {
    resourceType: "leases",
    limit,
  });
}
