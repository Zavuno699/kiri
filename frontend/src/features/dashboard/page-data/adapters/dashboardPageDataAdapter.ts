export interface DashboardPageDataAdapter {
  adapt(value: unknown): unknown
}

export const dashboardPageDataAdapter:
  DashboardPageDataAdapter = {
  adapt(value) {
    return value
  },
}
