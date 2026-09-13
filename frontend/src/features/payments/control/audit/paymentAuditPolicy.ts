export interface PaymentAuditPolicy {
  auditReads: boolean
  auditCommands: boolean
  auditFailures: boolean
}

export const paymentAuditPolicy:
  PaymentAuditPolicy = {
  auditReads: true,
  auditCommands: true,
  auditFailures: true,
}
