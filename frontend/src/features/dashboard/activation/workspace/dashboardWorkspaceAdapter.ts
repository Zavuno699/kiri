export interface DashboardWorkspaceAdapter {
  bind(
    value: unknown,
  ): unknown
}

export const dashboardWorkspaceAdapter:
  DashboardWorkspaceAdapter = {
  bind(value) {
    return value
  },
}
