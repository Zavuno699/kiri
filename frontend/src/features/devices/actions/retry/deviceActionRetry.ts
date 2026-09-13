export interface DeviceActionRetry {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const deviceActionRetry:
  DeviceActionRetry = {
  attempts: 0,
  maxAttempts: 3,
  retryable: true,
  exhausted: false,
}
