import {
  getRetryPolicy,
} from "../../../application/transactionFabric/retry/retryPolicyRegistry";

interface Props {
  transactionId: string;
}

export function RetryPolicyPanel({
  transactionId,
}: Props) {
  const policy =
    getRetryPolicy(
      transactionId,
    );

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Retry policy
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2">
        <div>
          Attempts:{" "}
          {policy.maxAttempts}
        </div>

        <div>
          Backoff:{" "}
          {policy.backoffMs}ms
        </div>

        <div>
          Exponential:{" "}
          {policy.exponential
            ? "yes"
            : "no"}
        </div>

        <div>
          Retryable errors:{" "}
          {policy.retryableErrors.length}
        </div>
      </div>
    </section>
  );
}
