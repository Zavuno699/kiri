export interface DeviceLiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const deviceLiveRuntime:
  DeviceLiveRuntime = {
  enabled: true,
  subscribed: false,
  eventCount: 0,
}
