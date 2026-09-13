export interface DeviceCommandAction {
  deviceId: string
  command: string
  payload?: Record<string, unknown>
}

export function createDeviceCommandAction(
  deviceId: string,
  command: string,
  payload?: Record<string, unknown>,
): DeviceCommandAction {
  return {
    deviceId,
    command,
    payload,
  }
}
