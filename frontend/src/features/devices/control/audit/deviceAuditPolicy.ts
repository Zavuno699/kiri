export interface DeviceAuditPolicy {
  auditReads: boolean
  auditCommands: boolean
  auditFailures: boolean
}

export const deviceAuditPolicy:
  DeviceAuditPolicy = {
  auditReads: true,
  auditCommands: true,
  auditFailures: true,
}
