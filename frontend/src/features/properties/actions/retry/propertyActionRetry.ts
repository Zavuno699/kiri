export interface PropertyActionRetry {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const propertyActionRetry:
  PropertyActionRetry = {
  attempts: 0,
  maxAttempts: 3,
  retryable: false,
  exhausted: false,
}
