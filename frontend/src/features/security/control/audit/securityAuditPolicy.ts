export interface SecurityAuditPolicy {
  auditReads: boolean
  auditCommands: boolean
  auditFailures: boolean
}

export const securityAuditPolicy:
  SecurityAuditPolicy = {
  auditReads: true,
  auditCommands: true,
  auditFailures: true,
}
