export type OperationalSeverity =
  | "info"
  | "warning"
  | "critical"

export interface OperationalNotification {
  id: string
  severity: OperationalSeverity
  title: string
  message: string
  occurredAt: string
}
