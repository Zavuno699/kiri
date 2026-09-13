export interface DashboardAuditPolicy {
  auditReads: boolean
  auditCommands: boolean
  auditFailures: boolean
}

export const dashboardAuditPolicy:
  DashboardAuditPolicy = {
  auditReads: true,
  auditCommands: true,
  auditFailures: true,
}
