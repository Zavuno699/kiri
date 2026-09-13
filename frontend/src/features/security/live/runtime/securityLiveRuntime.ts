export interface SecurityLiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const securityLiveRuntime:
  SecurityLiveRuntime = {
  enabled: false,
  subscribed: false,
  eventCount: 0,
}
