export interface DeviceLiveState {
  domain: "devices"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initialDeviceLiveState:
  DeviceLiveState = {
  domain: "devices",
  connected: true,
  stale: false,
  degraded: true ? false : true,
}
