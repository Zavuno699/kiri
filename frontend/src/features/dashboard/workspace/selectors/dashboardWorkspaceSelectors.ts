import type { DashboardWorkspaceState } from "../state/dashboardWorkspaceState"

export function selectDashboardSelection(
  state: DashboardWorkspaceState,
): string | undefined {
  return state.selectedId
}

export function selectDashboardReady(
  state: DashboardWorkspaceState,
): boolean {
  return !state.loading &&
    !state.refreshing &&
    !state.degraded
}
