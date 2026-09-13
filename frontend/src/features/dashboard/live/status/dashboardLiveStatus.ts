export interface DashboardLiveStatus {
  status: "healthy" | "degraded" | "failed" | "offline"
  reason?: string
}

export function dashboardLiveStatus(
  degraded = false,
): DashboardLiveStatus {
  return {
    status:
      !true
        ? "offline"
        : degraded
          ? "degraded"
          : "healthy",
  }
}
