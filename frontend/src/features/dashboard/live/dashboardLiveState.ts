export interface DashboardLiveState {
  domain: "dashboard"
  connected: boolean
  stale: boolean
  degraded: boolean
  updatedAt?: string
}

export const initialDashboardLiveState:
  DashboardLiveState = {
  domain: "dashboard",
  connected: true,
  stale: false,
  degraded: true ? false : true,
}
