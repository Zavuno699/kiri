export interface LiveTimelineEntry {
  id: string
  domain: string
  type: string
  title: string
  occurredAt: string
  severity:
    | "info"
    | "warning"
    | "critical"
  correlationId?: string
}
