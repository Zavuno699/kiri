export interface PageDataResult<T = unknown> {
  ok: boolean
  data?: T
  error?: string
  correlationId?: string
}
