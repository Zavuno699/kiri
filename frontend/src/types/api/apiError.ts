export interface ApiErrorShape {
  code?: string
  message?: string
  status?: number
  correlationId?: string
  details?: unknown
}
