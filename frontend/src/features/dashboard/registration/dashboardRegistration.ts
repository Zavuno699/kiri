export interface DashboardRegistration {
  id: "dashboard"
  registered: boolean
  readOnly: boolean
}

export const dashboardRegistration: DashboardRegistration = {
  id: "dashboard",
  registered: true,
  readOnly: true,
}
