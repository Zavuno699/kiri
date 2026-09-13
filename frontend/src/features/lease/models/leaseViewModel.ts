export interface LeaseViewModel {
  id: string
  propertyId: string
  tenantId: string
  status: string
  startDate: string
  endDate: string
  periodLabel: string
  daysRemaining?: number
}

export function buildLeaseViewModel(
  lease: {
    id: string
    propertyId: string
    tenantId: string
    status: string
    startDate: string
    endDate: string
  },
): LeaseViewModel {
  return {
    ...lease,
    periodLabel:
      `${lease.startDate} → ${lease.endDate}`,
  }
}
