export interface DashboardRuntimeActivation {
  domain: "dashboard"
  pageReady: boolean
  workspaceReady: boolean
  enabled: boolean
}

export const dashboardRuntimeActivation:
  DashboardRuntimeActivation = {
  domain: "dashboard",
  pageReady: true,
  workspaceReady: true,
  enabled: true,
}
