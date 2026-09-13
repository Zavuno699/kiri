export interface LockLiveNotification {
  level: "info" | "success" | "warning" | "error"
  title: string
  message: string
  createdAt: string
}

export function createLockLiveNotification(
  level: LockLiveNotification["level"],
  title: string,
  message: string,
): LockLiveNotification {
  return {
    level,
    title,
    message,
    createdAt:
      new Date().toISOString(),
  }
}
