export interface SecurityApiError {
  status: number
  code?: string
  message: string
  correlationId?: string
}
