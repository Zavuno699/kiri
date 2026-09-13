export interface DashboardNavigation {
  label: string
  path: string
  enabled: boolean
}

export const dashboardNavigation: DashboardNavigation = {
  label: "Dashboard",
  path: "/dashboard",
  enabled: true,
}
