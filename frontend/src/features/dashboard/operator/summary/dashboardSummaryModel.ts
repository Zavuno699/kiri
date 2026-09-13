export interface DashboardSummaryModel {
  total: number
  healthy: number
  degraded: number
  failed: number
  updatedAt: string
}

export function emptyDashboardSummary():
  DashboardSummaryModel {
  return {
    total: 0,
    healthy: 0,
    degraded: 0,
    failed: 0,
    updatedAt: new Date().toISOString(),
  }
}
