export interface SecurityTimelineEvent {
  id: string
  type: string
  severity: "info" | "warning" | "critical"
  message: string
  occurredAt: string
}
