export interface DashboardListPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const dashboardListPageAdapter:
  DashboardListPageAdapter = {
  toViewModel(value) {
    return value
  },
}
