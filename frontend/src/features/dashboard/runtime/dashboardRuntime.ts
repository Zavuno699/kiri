export interface DashboardRuntime {
  domain: "dashboard"
  started: boolean
  readOnly: boolean
}

export const dashboardRuntime: DashboardRuntime = {
  domain: "dashboard",
  started: false,
  readOnly: true,
}
