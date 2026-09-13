export interface TableState {
  page: number
  pageSize: number
  selectedIds: string[]
  sortBy?: string
  sortDirection?: "asc" | "desc"
}

export const initialTableState: TableState = {
  page: 1,
  pageSize: 25,
  selectedIds: [],
}
