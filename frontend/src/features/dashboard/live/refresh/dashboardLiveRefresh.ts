export interface DashboardLiveRefresh {
  requested: boolean
  running: boolean
  completed: boolean
  failed: boolean
}

export const initialDashboardLiveRefresh:
  DashboardLiveRefresh = {
  requested: false,
  running: false,
  completed: false,
  failed: false,
}
