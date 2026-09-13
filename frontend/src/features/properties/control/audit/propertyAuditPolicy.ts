export interface PropertyAuditPolicy {
  auditReads: boolean
  auditCommands: boolean
  auditFailures: boolean
}

export const propertyAuditPolicy:
  PropertyAuditPolicy = {
  auditReads: true,
  auditCommands: true,
  auditFailures: true,
}
