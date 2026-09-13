import type { DeviceLiveState } from "../deviceLiveState"
import type { DeviceLiveEvent } from "../events/deviceLiveEvent"

export function reduceDeviceLive(
  state: DeviceLiveState,
  event: DeviceLiveEvent,
): DeviceLiveState {
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
