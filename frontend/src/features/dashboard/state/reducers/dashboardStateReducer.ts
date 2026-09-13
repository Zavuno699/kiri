import type { DashboardState } from "../dashboardState"

export function reduceDashboardState(
  state: DashboardState,
  event: string,
): DashboardState {
  switch (event) {
    case "dashboard.load":
      return "loading"

    case "dashboard.loaded":
      return "active"

    case "dashboard.degraded":
      return "degraded"

    case "dashboard.recovered":
      return "active"

    case "dashboard.failed":
      return "failed"

    default:
      return state
  }
}
