export interface ListPagination {
  page: number
  pageSize: number
  total: number
  hasNext: boolean
  hasPrevious: boolean
}

export function createListPagination(
  page = 1,
  pageSize = 25,
  total = 0,
): ListPagination {
  return {
    page,
    pageSize,
    total,
    hasNext: page * pageSize < total,
    hasPrevious: page > 1,
  }
}
