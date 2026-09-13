export interface LiveResourceState<T = unknown> {
  key: string
  domain: string
  data?: T
  version: number
  stale: boolean
  refreshing: boolean
  degraded: boolean
  updatedAt?: string
  error?: string
}
