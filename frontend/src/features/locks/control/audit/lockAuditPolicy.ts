export interface LockAuditPolicy {
  auditReads: boolean
  auditCommands: boolean
  auditFailures: boolean
}

export const lockAuditPolicy:
  LockAuditPolicy = {
  auditReads: true,
  auditCommands: true,
  auditFailures: true,
}
