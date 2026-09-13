import type {
  NotificationSeverity,
  OperatorNotification,
} from "./notificationTypes"

export function createNotification(
  severity: NotificationSeverity,
  title: string,
  message: string,
  options: {
    persistent?: boolean
  } = {},
): OperatorNotification {
  return {
    id: crypto.randomUUID(),
    severity,
    title,
    message,
    createdAt:
      new Date().toISOString(),
    persistent:
      options.persistent,
  }
}
