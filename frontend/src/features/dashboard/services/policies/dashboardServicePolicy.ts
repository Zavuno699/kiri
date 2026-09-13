export interface DashboardServicePolicy {
  readable: boolean
  refreshable: boolean
  commandable: boolean
}

export const dashboardServicePolicy:
  DashboardServicePolicy = {
  readable: true,
  refreshable: true,
  commandable: true,
}
