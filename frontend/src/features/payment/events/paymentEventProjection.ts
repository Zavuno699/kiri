export interface PaymentEventProjection {
  paymentId: string
  status?: string
  reconciliationStatus?: string
  entitlementImpact?: string
  occurredAt: string
}
