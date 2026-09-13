import type { DeviceLiveEvent } from "../events/deviceLiveEvent"

export interface DeviceLiveHandler {
  handle(
    event: DeviceLiveEvent,
  ): void
}

export function createDeviceLiveHandler(
  handle: (
    event: DeviceLiveEvent,
  ) => void,
): DeviceLiveHandler {
  return {
    handle,
  }
}
