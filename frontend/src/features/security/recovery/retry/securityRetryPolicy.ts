export interface SecurityRetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const securityRetryPolicy: SecurityRetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
