export interface LeaseEntitlement {
  leaseId: string
  entitledThrough?: string
  graceUntil?: string
  daysRemaining?: number
  compliant: boolean
}
