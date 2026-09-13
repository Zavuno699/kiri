export interface DeviceRegisterAction {
  deviceId: string
  metadata?: Record<string, unknown>
}

export function createDeviceRegisterAction(
  deviceId: string,
  metadata?: Record<string, unknown>,
): DeviceRegisterAction {
  return {
    deviceId,
    metadata,
  }
}
