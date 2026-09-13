export type NotificationSeverity =
  | "info"
  | "success"
  | "warning"
  | "error"

export interface OperatorNotification {
  id: string
  severity: NotificationSeverity
  title: string
  message: string
  createdAt: string
  persistent?: boolean
}
