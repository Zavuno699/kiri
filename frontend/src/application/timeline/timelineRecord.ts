export interface TimelineRecord {
  id: string
  domain: string
  entityId?: string
  type: string
  title: string
  description?: string
  occurredAt: string
  severity: "info" | "warning" | "critical"
  correlationId?: string
}
