export interface RetryPolicy {
  maxAttempts: number
  baseDelayMs: number
  maxDelayMs: number
}

export const defaultRetryPolicy: RetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 250,
  maxDelayMs: 2500,
}

export function retryDelay(
  attempt: number,
  policy: RetryPolicy,
): number {
  const delay =
    policy.baseDelayMs *
    Math.pow(2, Math.max(0, attempt - 1))

  return Math.min(
    delay,
    policy.maxDelayMs,
  )
}
