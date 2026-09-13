export interface LockRetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const lockRetryPolicy: LockRetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
