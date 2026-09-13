export interface DashboardEvent<T = unknown> {
  id: string
  type: string
  domain: "dashboard"
  payload: T
  occurredAt: string
  correlationId?: string
}
