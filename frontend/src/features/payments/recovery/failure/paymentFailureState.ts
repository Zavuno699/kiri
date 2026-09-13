export interface PaymentFailureState {
  failed: boolean
  code?: string
  message?: string
  retryable: boolean
}
