import {
  listTransactions,
} from "../../../application/transactionFabric/registry/transactionRegistry";

export function TransactionList() {
  const transactions =
    listTransactions();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Transaction definitions
      </div>

      <div className="mt-3 space-y-2">
        {transactions.map(
          (transaction) => (
            <div
              key={transaction.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-200">
                {transaction.label}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {transaction.description}
              </div>

              <div className="mt-2 text-[10px] uppercase tracking-wider text-slate-600">
                {transaction.risk}
                {" · "}
                {transaction.idempotent
                  ? "idempotent"
                  : "non-idempotent"}
                {" · "}
                {transaction.recoverable
                  ? "recoverable"
                  : "non-recoverable"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
