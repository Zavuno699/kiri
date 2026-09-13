export interface DashboardPageRefresh {
  refreshing: boolean
  requestedAt?: string
  completedAt?: string
}

export function initialDashboardPageRefresh():
  DashboardPageRefresh {
  return {
    refreshing: false,
  }
}
