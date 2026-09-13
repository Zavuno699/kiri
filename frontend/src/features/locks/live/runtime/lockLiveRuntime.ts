export interface LockLiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const lockLiveRuntime:
  LockLiveRuntime = {
  enabled: false,
  subscribed: false,
  eventCount: 0,
}
