export interface ResourceResponse<T> {
  data: T
  version?: number
  updatedAt?: string
  correlationId?: string
}
