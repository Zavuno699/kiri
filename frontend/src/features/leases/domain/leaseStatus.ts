import type { OperationalLease } from "../../../domain/contracts"

export function leaseStatus(
  lease: OperationalLease,
): string {
  return lease.status ?? "unknown"
}

export function isLeaseActive(
  lease: OperationalLease,
): boolean {
  const status = lease.status?.toLowerCase()
  return status === "active" || status === "current"
}
