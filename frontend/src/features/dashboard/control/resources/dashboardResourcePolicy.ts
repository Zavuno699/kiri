export interface DashboardResourcePolicy {
  cacheable: boolean
  refreshable: boolean
  commandable: boolean
}

export const dashboardResourcePolicy:
  DashboardResourcePolicy = {
  cacheable: true,
  refreshable: true,
  commandable: true,
}
