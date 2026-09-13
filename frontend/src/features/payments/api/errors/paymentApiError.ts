export interface PaymentApiError {
  status: number
  code?: string
  message: string
  correlationId?: string
}
