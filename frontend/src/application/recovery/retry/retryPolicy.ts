export interface RetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const defaultRetryPolicy: RetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
