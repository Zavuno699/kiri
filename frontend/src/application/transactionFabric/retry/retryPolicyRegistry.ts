import type {
  RetryPolicy,
} from "../contracts/retryPolicy";

const policies = new Map<
  string,
  RetryPolicy
>();

export function registerRetryPolicy(
  transactionId: string,
  policy: RetryPolicy,
): void {
  policies.set(
    transactionId,
    policy,
  );
}

export function getRetryPolicy(
  transactionId: string,
): RetryPolicy {
  return (
    policies.get(
      transactionId,
    ) ?? {
      maxAttempts:
        3,
      backoffMs:
        500,
      exponential:
        true,
      retryableErrors:
        [
          "timeout",
          "temporary",
          "unavailable",
          "reconciliation-required",
        ],
    }
  );
}

export function registerCanonicalRetryPolicies(): void {
  const common: RetryPolicy = {
    maxAttempts:
      3,
    backoffMs:
      500,
    exponential:
      true,
    retryableErrors:
      [
        "timeout",
        "temporary",
        "unavailable",
        "reconciliation-required",
      ],
  };

  const critical: RetryPolicy = {
    maxAttempts:
      2,
    backoffMs:
      1000,
    exponential:
      true,
    retryableErrors:
      [
        "temporary",
        "unavailable",
      ],
  };

  registerRetryPolicy(
    "txn.lease-payment",
    common,
  );

  registerRetryPolicy(
    "txn.lease-device",
    common,
  );

  registerRetryPolicy(
    "txn.device-reconciliation",
    common,
  );

  registerRetryPolicy(
    "txn.lease-lock",
    critical,
  );

  registerRetryPolicy(
    "txn.security-recovery",
    critical,
  );
}
