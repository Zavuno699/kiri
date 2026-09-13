export interface DashboardActionRetry {
  attempts: number
  maxAttempts: number
  retryable: boolean
  exhausted: boolean
}

export const dashboardActionRetry:
  DashboardActionRetry = {
  attempts: 0,
  maxAttempts: 3,
  retryable: false,
  exhausted: false,
}
