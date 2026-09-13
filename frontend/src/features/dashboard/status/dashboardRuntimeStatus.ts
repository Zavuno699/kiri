export interface DashboardRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const dashboardRuntimeStatus: DashboardRuntimeStatus = {
  available: true,
  degraded: false,
}
