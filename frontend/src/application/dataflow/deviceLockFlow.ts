export interface DeviceLockFlow {
  deviceId: string
  lockIds: string[]
}

export function createDeviceLockFlow(
  deviceId: string,
  lockIds: string[],
): DeviceLockFlow {
  return {
    deviceId,
    lockIds: [...lockIds],
  }
}
