export interface DeviceLiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initialDeviceLiveRefresh:
  DeviceLiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
