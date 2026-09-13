export interface LockActionRetry {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const lockActionRetry:
  LockActionRetry = {
  attempts: 0,
  maxAttempts: 3,
  retryable: false,
  exhausted: false,
}
