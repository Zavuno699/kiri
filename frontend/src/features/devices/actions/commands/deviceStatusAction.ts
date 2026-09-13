export interface DeviceStatusAction {
  deviceId: string
}

export function createDeviceStatusAction(
  deviceId: string,
): DeviceStatusAction {
  return {
    deviceId,
  }
}
