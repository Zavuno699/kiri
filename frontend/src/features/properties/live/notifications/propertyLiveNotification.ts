export interface PropertyLiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function createPropertyLiveNotification(
  level: PropertyLiveNotification["level"],
  title: string,
  message: string,
): PropertyLiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
