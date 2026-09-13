export interface LeaseDetail {
  id: string
  tenantId: string
  propertyId: string
  status: string
  startDate: string
  endDate: string
  version: number
  entitlementThrough?: string
  graceUntil?: string
}
