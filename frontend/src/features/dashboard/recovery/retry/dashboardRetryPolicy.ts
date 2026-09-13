export interface DashboardRetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const dashboardRetryPolicy: DashboardRetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
