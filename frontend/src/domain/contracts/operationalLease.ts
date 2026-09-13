export interface OperationalLease {
  id: string
  propertyId: string
  tenantId?: string
  status?: string
  startDate?: string
  endDate?: string
  amount?: number
  currency?: string
  entitlementDays?: number
  metadata?: Record<string, unknown>
}
