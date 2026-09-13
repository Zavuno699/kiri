export interface DeviceHealth {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthyDevice():
  DeviceHealth {
  return {
    healthy: true,
    degraded: false,
  }
}
