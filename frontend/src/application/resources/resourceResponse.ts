export interface ResourceResponse<T = unknown> {
  data?: T
  status: number
  ok: boolean
  version?: number
  updatedAt?: string
  correlationId?: string
}
