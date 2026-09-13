export interface UnifiedTimelineModel {
  records: Array<{
    id: string
    domain: string
    title: string
    occurredAt: string
    severity: "info" | "warning" | "critical"
  }>
  total: number
}
