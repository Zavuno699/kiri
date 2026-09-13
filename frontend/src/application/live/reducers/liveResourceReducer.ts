import type { LiveEvent } from "../events/liveEvent"
import type { LiveResourceState } from "../resources/liveResourceState"

export function reduceLiveResource<T>(
  state: LiveResourceState<T>,
  event: LiveEvent,
): LiveResourceState<T> {
  if (
    event.type ===
    "resource.invalidated"
  ) {
    return {
      ...state,
      stale: true,
      version: state.version + 1,
      updatedAt:
        new Date().toISOString(),
    }
  }

  if (
    event.type ===
    "resource.refreshed"
  ) {
    return {
      ...state,
      stale: false,
      refreshing: false,
      version: state.version + 1,
      updatedAt:
        new Date().toISOString(),
    }
  }

  return state
}
