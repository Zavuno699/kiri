export interface PageDataState<T = unknown> {
  pageId: string
  loading: boolean
  stale: boolean
  error: string | null
  data: T | null
}
