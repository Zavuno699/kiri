import type {
  LeaseRecord,
} from "../../features/leases/types/lease"

export interface LeaseViewModel
  extends LeaseRecord {
  statusLabel: string
  periodLabel: string
  identityLabel: string
}

export function toLeaseViewModel(
  lease: LeaseRecord,
): LeaseViewModel {
  return {
    ...lease,
    statusLabel: lease.status ?? "Unknown",
    periodLabel:
      `${lease.startDate} → ${lease.endDate}`,
    identityLabel:
      `${lease.tenantId} / ${lease.propertyId}`,
  }
}
