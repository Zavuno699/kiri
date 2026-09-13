export interface LeaseRetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const leaseRetryPolicy: LeaseRetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
