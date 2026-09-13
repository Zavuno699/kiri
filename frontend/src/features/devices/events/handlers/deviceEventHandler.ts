import type { DeviceEvent } from "../deviceEvent"

export interface DeviceEventHandler {
  handle(event: DeviceEvent): Promise<void>
}

export function createDeviceEventHandler(
  execute: (
    event: DeviceEvent,
  ) => Promise<unknown>,
): DeviceEventHandler {
  return {
    async handle(event) {
      await execute(event)
    },
  }
}
