export interface PaymentReconciliationQuery {
  paymentId: string
  includeLease?: boolean
  includeEntitlement?: boolean
}
