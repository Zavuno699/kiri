import type { LockLiveState } from "../lockLiveState"
import type { LockLiveEvent } from "../events/lockLiveEvent"

export function reduceLockLive(
  state: LockLiveState,
  event: LockLiveEvent,
): LockLiveState {
  if (event.type.includes("updated")) {
    return {
      ...state,
      stale: false,
      degraded: false,
      updatedAt: event.occurredAt,
    }
  }

  if (
    event.type.includes("degraded") ||
    event.type.includes("failed")
  ) {
    return {
      ...state,
      degraded: true,
      updatedAt: event.occurredAt,
    }
  }

  return state
}
