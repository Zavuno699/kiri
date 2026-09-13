export interface PaymentActionRetry {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const paymentActionRetry:
  PaymentActionRetry = {
  attempts: 0,
  maxAttempts: 3,
  retryable: false,
  exhausted: false,
}
