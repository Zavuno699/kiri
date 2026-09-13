export interface RetryPolicy {
  maxAttempts: number;
  backoffMs: number;
  exponential: boolean;
  retryableErrors: string[];
}
