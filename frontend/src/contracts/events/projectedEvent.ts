export interface ProjectedEvent {
  id: string
  category: string
  type: string
  severity:
    | "info"
    | "warning"
    | "critical"
  title: string
  detail: string
  occurredAt: string
  correlationId?: string
}
