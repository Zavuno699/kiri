export interface LeaseLiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const leaseLiveRuntime:
  LeaseLiveRuntime = {
  enabled: true,
  subscribed: false,
  eventCount: 0,
}
