import {
  listAuditEvents,
} from "../../../../application/audit/store/auditStore"

export function getSecurityAuditTimeline() {
  return listAuditEvents().sort(
    (a: { occurredAt: string }, b: { occurredAt: string }) =>
      Date.parse(b.occurredAt) -
      Date.parse(a.occurredAt),
  )
}
