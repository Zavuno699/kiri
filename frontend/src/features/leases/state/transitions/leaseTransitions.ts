import type { LeaseState } from "../leaseState"

export interface LeaseTransition {
  from: LeaseState
  to: LeaseState
  event: string
}

export const leaseTransitions:
  LeaseTransition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "leases.load",
  },
  {
    from: "loading",
    to: "active",
    event: "leases.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "leases.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "leases.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "leases.failed",
  },
]
