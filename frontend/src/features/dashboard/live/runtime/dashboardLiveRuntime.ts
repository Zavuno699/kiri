export interface DashboardLiveRuntime {
  enabled: boolean
  subscribed: boolean
  eventCount: number
}

export const dashboardLiveRuntime:
  DashboardLiveRuntime = {
  enabled: true,
  subscribed: false,
  eventCount: 0,
}
