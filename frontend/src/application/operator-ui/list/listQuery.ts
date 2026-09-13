export interface OperatorListQuery {
  search?: string
  status?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortDirection?: "asc" | "desc"
}
