export interface DashboardLiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function createDashboardLiveNotification(
  level: DashboardLiveNotification["level"],
  title: string,
  message: string,
): DashboardLiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
