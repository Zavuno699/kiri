import type { LockState } from "../lockState"

export interface LockTransition {
  from: LockState
  to: LockState
  event: string
}

export const lockTransitions:
  LockTransition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "locks.load",
  },
  {
    from: "loading",
    to: "active",
    event: "locks.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "locks.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "locks.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "locks.failed",
  },
]
