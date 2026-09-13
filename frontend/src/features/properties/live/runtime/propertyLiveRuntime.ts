export interface PropertyLiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const propertyLiveRuntime:
  PropertyLiveRuntime = {
  enabled: true,
  subscribed: false,
  eventCount: 0,
}
