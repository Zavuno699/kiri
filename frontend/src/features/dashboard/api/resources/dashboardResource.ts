export interface DashboardResource<T = unknown> {
  id: string
  data?: T
  loading: boolean
  refreshing: boolean
  stale: boolean
  error?: string
  version: number
}
