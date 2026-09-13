import type { DashboardEvent } from "../dashboardEvent"

export interface DashboardEventProjection {
  apply(event: DashboardEvent): unknown
}
