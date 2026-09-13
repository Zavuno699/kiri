import type { LeaseRecord } from "../types/lease"

export function selectActiveLeases(
  leases: LeaseRecord[],
) {
  return leases.filter(
    (lease) => lease.status === "active",
  )
}

export function selectDelinquentLeases(
  leases: LeaseRecord[],
) {
  return leases.filter(
    (lease) => lease.status === "delinquent",
  )
}

export function selectPendingLeases(
  leases: LeaseRecord[],
) {
  return leases.filter(
    (lease) => lease.status === "pending",
  )
}
