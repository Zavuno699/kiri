import type { PropertyLiveState } from "../propertyLiveState"
import type { PropertyLiveEvent } from "../events/propertyLiveEvent"

export function reducePropertyLive(
  state: PropertyLiveState,
  event: PropertyLiveEvent,
): PropertyLiveState {
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
