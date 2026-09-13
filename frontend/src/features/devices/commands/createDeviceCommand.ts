import type { DeviceCommandType } from "./deviceCommandTypes"

export interface DeviceCommand {
  type: DeviceCommandType
  deviceId?: string
}

export function createDeviceCommand(
  type: DeviceCommandType,
  deviceId?: string,
): DeviceCommand {
  return {
    type,
    deviceId,
  }
}
