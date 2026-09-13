import type { DashboardState } from "../dashboardState"

export interface DashboardTransition {
  from: DashboardState
  to: DashboardState
  event: string
}

export const dashboardTransitions:
  DashboardTransition[] = [
  {
    from: "unknown",
    to: "loading",
    event: "dashboard.load",
  },
  {
    from: "loading",
    to: "active",
    event: "dashboard.loaded",
  },
  {
    from: "active",
    to: "degraded",
    event: "dashboard.degraded",
  },
  {
    from: "degraded",
    to: "active",
    event: "dashboard.recovered",
  },
  {
    from: "active",
    to: "failed",
    event: "dashboard.failed",
  },
]
