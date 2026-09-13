export interface DashboardHealth {
  healthy: boolean
  degraded: boolean
  reason?: string
}

export function healthyDashboard():
  DashboardHealth {
  return {
    healthy: true,
    degraded: false,
  }
}
