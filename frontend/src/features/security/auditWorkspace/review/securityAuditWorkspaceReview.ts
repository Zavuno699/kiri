import {
  listAuditEvents,
} from "../../../../application/audit/store/auditStore"

export function getSecurityAuditReview() {
  return listAuditEvents().filter(
    (event: { category: string }) =>
      event.category === "authorization" ||
      event.category === "authentication" ||
      event.category === "command",
  )
}
