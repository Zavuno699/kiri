export interface DashboardListBinding {
  items: unknown[]
  total: number
  loading: boolean
  refreshing: boolean
}

export const emptyDashboardListBinding:
  DashboardListBinding = {
  items: [],
  total: 0,
  loading: false,
  refreshing: false,
}
