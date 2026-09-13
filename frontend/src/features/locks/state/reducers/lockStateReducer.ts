import type { LockState } from "../lockState"

export function reduceLockState(
  state: LockState,
  event: string,
): LockState {
  switch (event) {
    case "locks.load":
      return "loading"

    case "locks.loaded":
      return "active"

    case "locks.degraded":
      return "degraded"

    case "locks.recovered":
      return "active"

    case "locks.failed":
      return "failed"

    default:
      return state
  }
}
