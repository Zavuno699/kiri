export interface UnifiedActivityModel {
  records: Array<{
    id: string
    domain: string
    action: string
    outcome: string
    occurredAt: string
  }>
  total: number
}
