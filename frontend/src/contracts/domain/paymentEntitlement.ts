export interface PaymentEntitlementRelationship {
  paymentId: string
  leaseId: string
  settled: boolean
  entitlementUpdated: boolean
  entitledThrough?: string
}
