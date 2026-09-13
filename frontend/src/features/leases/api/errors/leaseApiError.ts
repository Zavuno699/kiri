export interface LeaseApiError {
  status: number
  code?: string
  message: string
  correlationId?: string
}
