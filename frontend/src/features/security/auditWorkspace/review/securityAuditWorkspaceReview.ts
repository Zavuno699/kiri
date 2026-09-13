import {
  listAuditEvents,
} from "../../../application/audit/store/auditStore"

export function getSecurityAuditReview() {
  return listAuditEvents().filter(
    (event) =>
      event.category === "authorization" ||
      event.category === "authentication" ||
      event.category === "command",
  )
}
