export interface DashboardRefreshAction {
  reason?: "manual" | "event" | "startup"
}

export function createDashboardRefreshAction(
  reason: DashboardRefreshAction["reason"] = "manual",
): DashboardRefreshAction {
  return {
    reason,
  }
}
