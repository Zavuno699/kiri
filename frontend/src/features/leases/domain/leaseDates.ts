import type { OperationalLease } from "../../../domain/contracts"

export function leaseStartDate(
  lease: OperationalLease,
): string | undefined {
  return lease.startDate
}

export function leaseEndDate(
  lease: OperationalLease,
): string | undefined {
  return lease.endDate
}
