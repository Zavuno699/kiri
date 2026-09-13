import type { LeaseState } from "../leaseState"

export function reduceLeaseState(
  state: LeaseState,
  event: string,
): LeaseState {
  switch (event) {
    case "leases.load":
      return "loading"

    case "leases.loaded":
      return "active"

    case "leases.degraded":
      return "degraded"

    case "leases.recovered":
      return "active"

    case "leases.failed":
      return "failed"

    default:
      return state
  }
}
