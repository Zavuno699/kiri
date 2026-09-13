import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore"

export function getSecurityAuditTimeline() {
  return listAuditEvents().sort(
    (a, b) =>
      Date.parse(b.occurredAt) -
      Date.parse(a.occurredAt),
  )
}
