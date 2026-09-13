export interface LeaseEventProjection {
  leaseId: string
  status?: string
  entitlementChanged: boolean
  occurredAt: string
}
