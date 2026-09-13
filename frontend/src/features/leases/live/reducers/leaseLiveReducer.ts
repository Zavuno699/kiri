import type { LeaseLiveState } from "../leaseLiveState"
import type { LeaseLiveEvent } from "../events/leaseLiveEvent"

export function reduceLeaseLive(
  state: LeaseLiveState,
  event: LeaseLiveEvent,
): LeaseLiveState {
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
