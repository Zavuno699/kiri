export interface HttpErrorResponse {
  status: number
  code?: string
  message: string
  details?: unknown
  correlationId?: string
}
