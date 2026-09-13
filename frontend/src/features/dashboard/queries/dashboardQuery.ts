export interface DashboardQuery {
  window:
    | "hour"
    | "day"
    | "week"
    | "month"
}

export function createDashboardQuery(
  window: DashboardQuery["window"] = "day",
): DashboardQuery {
  return { window }
}
