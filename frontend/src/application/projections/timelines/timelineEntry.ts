export interface TimelineEntry {
  id: string
  domain: string
  type: string
  title: string
  occurredAt: string
  correlationId?: string
  severity: "info" | "warning" | "critical"
}
