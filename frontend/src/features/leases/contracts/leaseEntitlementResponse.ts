export interface LeaseEntitlementResponseContract {
  leaseId: string
  entitledThrough?: string
  graceUntil?: string
  daysRemaining?: number
  compliant: boolean
}
