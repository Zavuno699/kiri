import { createDashboardQuery } from "../../features/dashboard/queries/dashboardQuery"

export interface DashboardFacade {
  load(window?: "hour" | "day" | "week" | "month"): Promise<unknown>
}

export function createDashboardFacade(
  query: (input: unknown) => Promise<unknown>,
): DashboardFacade {
  return {
    load(window = "day") {
      return query(createDashboardQuery(window))
    },
  }
}
