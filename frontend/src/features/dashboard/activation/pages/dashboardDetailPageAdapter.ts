export interface DashboardDetailPageAdapter {
  toViewModel(
    value: unknown,
  ): unknown
}

export const dashboardDetailPageAdapter:
  DashboardDetailPageAdapter = {
  toViewModel(value) {
    return value
  },
}
