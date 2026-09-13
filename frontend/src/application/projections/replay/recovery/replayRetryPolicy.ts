export type ReplayRetryPolicy = {
  maxAttempts: number;
  baseDelayMs: number;
  maxDelayMs: number;
};

export const defaultReplayRetryPolicy: ReplayRetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 250,
  maxDelayMs: 5_000,
};

export function calculateReplayRetryDelay(
  attempt: number,
  policy: ReplayRetryPolicy = defaultReplayRetryPolicy,
): number {
  const safeAttempt = Math.max(0, attempt);
  return Math.min(
    policy.maxDelayMs,
    policy.baseDelayMs * 2 ** safeAttempt,
  );
}
