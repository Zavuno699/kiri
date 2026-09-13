import type { LeaseRecord } from "../types/lease"
import type { LeaseMetrics } from "../types/leaseMetrics"

export function projectLeaseMetrics(
  leases: LeaseRecord[],
): LeaseMetrics {
  return {
    active: leases.filter(
      (lease) => lease.status === "active",
    ).length,
    pending: leases.filter(
      (lease) => lease.status === "pending",
    ).length,
    expired: leases.filter(
      (lease) => lease.status === "expired",
    ).length,
    delinquent: leases.filter(
      (lease) => lease.status === "delinquent",
    ).length,
    frozen: leases.filter(
      (lease) => lease.status === "frozen",
    ).length,
  }
}
