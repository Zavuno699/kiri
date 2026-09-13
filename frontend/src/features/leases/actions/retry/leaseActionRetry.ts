export interface LeaseActionRetry {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const leaseActionRetry:
  LeaseActionRetry = {
  attempts: 0,
  maxAttempts: 3,
  retryable: false,
  exhausted: false,
}
