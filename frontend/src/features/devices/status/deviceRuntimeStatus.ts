export interface DeviceRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const deviceRuntimeStatus: DeviceRuntimeStatus = {
  available: true,
  degraded: false,
}
