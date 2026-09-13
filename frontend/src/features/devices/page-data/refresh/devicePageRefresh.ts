export interface DevicePageRefresh {
  refreshing: boolean
  requestedAt?: string
  completedAt?: string
}

export function initialDevicePageRefresh():
  DevicePageRefresh {
  return {
    refreshing: false,
  }
}
