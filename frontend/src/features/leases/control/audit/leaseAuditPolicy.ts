export interface LeaseAuditPolicy {
  auditReads: boolean
  auditCommands: boolean
  auditFailures: boolean
}

export const leaseAuditPolicy:
  LeaseAuditPolicy = {
  auditReads: true,
  auditCommands: true,
  auditFailures: true,
}
