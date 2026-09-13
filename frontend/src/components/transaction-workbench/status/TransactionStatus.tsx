import {
  getTransactionCoverage,
} from "../../../application/transactionFabric/diagnostics/transactionCoverage";

export function TransactionStatus() {
  const coverage =
    getTransactionCoverage();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        Transaction fabric status
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          Transactions:{" "}
          {coverage.transactions}
        </div>

        <div>
          Sagas:{" "}
          {coverage.sagas}
        </div>

        <div>
          Checkpoints:{" "}
          {coverage.checkpoints}
        </div>

        <div>
          Idempotency:{" "}
          {coverage.idempotency}
        </div>

        <div>
          Ready:{" "}
          {coverage.ready
            ? "yes"
            : "pending"}
        </div>
      </div>
    </section>
  );
}
