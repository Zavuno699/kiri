import type { SortContract } from "./sort"
import type { FilterContract } from "./filter"

export interface QueryContract {
  search?: string
  filters?: FilterContract[]
  sort?: SortContract[]
  page?: number
  pageSize?: number
  cursor?: string
}
