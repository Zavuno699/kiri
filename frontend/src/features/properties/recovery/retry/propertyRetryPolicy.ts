export interface PropertyRetryPolicy {
  maxAttempts: number
  backoffMs: number
  retryable: boolean
}

export const propertyRetryPolicy: PropertyRetryPolicy = {
  maxAttempts: 3,
  backoffMs: 500,
  retryable: true,
}
