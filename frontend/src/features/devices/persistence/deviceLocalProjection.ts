export interface DeviceLocalProjection {
  id: string
  version: number
  updatedAt: string
}

export function createDeviceLocalProjection(
  id: string,
): DeviceLocalProjection {
  return {
    id,
    version: 1,
    updatedAt: new Date().toISOString(),
  }
}
