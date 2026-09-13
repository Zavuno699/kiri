export interface WorkspaceBinding<T = unknown> {
  id: string
  domain: string
  pageId: string
  data?: T
  loading: boolean
  refreshing: boolean
  degraded: boolean
  error?: string
}
