export interface PageRequestContract {
  page?: number
  pageSize?: number
  cursor?: string
}

export interface PageResultContract<T> {
  items: T[]
  page?: number
  pageSize?: number
  total?: number
  nextCursor?: string
  hasNext?: boolean
}
