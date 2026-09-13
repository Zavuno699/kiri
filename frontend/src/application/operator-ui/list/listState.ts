export interface OperatorListState {
  loading: boolean
  refreshing: boolean
  empty: boolean
  error?: string
  page: number
  pageSize: number
  total: number
  selectedIds: string[]
}
