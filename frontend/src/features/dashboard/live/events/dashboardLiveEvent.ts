export interface DashboardLiveEvent<T = unknown> {
  id: string
  domain: "dashboard"
  type: string
  payload?: T
  occurredAt: string
  correlationId?: string
}
