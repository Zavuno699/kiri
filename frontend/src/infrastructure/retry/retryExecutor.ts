import type {
  RetryPolicy,
} from "./retryPolicy"
import {
  defaultRetryPolicy,
  retryDelay,
} from "./retryPolicy"

function sleep(
  milliseconds: number,
): Promise<void> {
  return new Promise((resolve) =>
    window.setTimeout(
      resolve,
      milliseconds,
    ),
  )
}

export async function withRetry<T>(
  operation: () => Promise<T>,
  policy: RetryPolicy = defaultRetryPolicy,
): Promise<T> {
  let lastError: unknown

  for (
    let attempt = 1;
    attempt <= policy.maxAttempts;
    attempt++
  ) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      if (
        attempt >=
        policy.maxAttempts
      ) {
        break
      }

      await sleep(
        retryDelay(attempt, policy),
      )
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("Operation failed.")
}
