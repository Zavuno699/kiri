import {
  getRetryPolicy,
} from "./retryPolicyRegistry";

export function shouldRetry(
  transactionId: string,
  attempts: number,
  error: string,
): boolean {
  const policy =
    getRetryPolicy(
      transactionId,
    );

  if (
    attempts >=
    policy.maxAttempts
  ) {
    return false;
  }

  return policy.retryableErrors.some(
    (candidate) =>
      error.includes(
        candidate,
      ),
  );
}
