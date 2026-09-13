import type { SecurityLiveState } from "../securityLiveState"
import type { SecurityLiveEvent } from "../events/securityLiveEvent"

export function reduceSecurityLive(
  state: SecurityLiveState,
  event: SecurityLiveEvent,
): SecurityLiveState {
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
