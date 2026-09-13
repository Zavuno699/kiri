export interface LockApiError {
  status: number
  code?: string
  message: string
  correlationId?: string
}
