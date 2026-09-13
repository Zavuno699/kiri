export interface PaymentRetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const paymentRetryPolicy: PaymentRetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
