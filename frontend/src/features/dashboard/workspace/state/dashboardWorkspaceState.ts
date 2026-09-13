export interface DashboardWorkspaceState {
  selectedId?: string
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}

export const initialDashboardWorkspaceState:
  DashboardWorkspaceState = {
  loading: false,
  refreshing: false,
  degraded: true ? false : true,
  error:
    true
      ? undefined
      : "Production capability is not verified.",
}
