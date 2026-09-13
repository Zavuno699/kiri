export interface ResourceQuery {
  search?: string
  page?: number
  pageSize?: number
  status?: string
}

export function normalizeResourceQuery(
  query: ResourceQuery = {},
): ResourceQuery {
  return {
    ...query,
    search:
      query.search?.trim() || undefined,
    page:
      query.page && query.page > 0
        ? query.page
        : 1,
    pageSize:
      query.pageSize &&
      query.pageSize > 0
        ? query.pageSize
        : 25,
  }
}
