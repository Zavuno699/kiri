export interface DeviceLiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function createDeviceLiveNotification(
  level: DeviceLiveNotification["level"],
  title: string,
  message: string,
): DeviceLiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
