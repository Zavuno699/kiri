export interface LeaseLiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function createLeaseLiveNotification(
  level: LeaseLiveNotification["level"],
  title: string,
  message: string,
): LeaseLiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
