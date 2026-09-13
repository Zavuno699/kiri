export interface SecurityLiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function createSecurityLiveNotification(
  level: SecurityLiveNotification["level"],
  title: string,
  message: string,
): SecurityLiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
