import {
  listAuditEvents,
} from "../../../../application/audit/store/auditStore"

export function getSecurityAuditWorkspaceMetrics() {
  const events = listAuditEvents()

  return {
    total: events.length,
    denied: events.filter(
      (event: { outcome: string }) => event.outcome === "denied",
    ).length,
    failed: events.filter(
      (event: { outcome: string }) => event.outcome === "failed",
    ).length,
    successful: events.filter(
      (event: { outcome: string }) => event.outcome === "success",
    ).length,
  }
}
