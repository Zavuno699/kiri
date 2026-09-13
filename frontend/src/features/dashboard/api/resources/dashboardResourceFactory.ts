import type { DashboardResource } from "./dashboardResource"

export function createDashboardResource<T>(
  id: string,
): DashboardResource<T> {
  return {
    id,
    loading: false,
    refreshing: false,
    stale: false,
    version: 0,
  }
}
