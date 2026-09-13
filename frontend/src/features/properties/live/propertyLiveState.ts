export interface PropertyLiveState {
  domain: "properties"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initialPropertyLiveState:
  PropertyLiveState = {
  domain: "properties",
  connected: true,
  stale: false,
  degraded: true ? false : true,
}
