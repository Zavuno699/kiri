import {
  useEffect,
  useState,
} from "react";

import {
  getTransactionDiagnostics,
} from "../../../application/transactionFabric/diagnostics/transactionDiagnostics";

import {
  listTransactionStates,
} from "../../../application/transactionFabric/state/transactionStateStore";

export function TransactionWorkbenchHeader() {
  const [
    diagnostics,
    setDiagnostics,
  ] = useState(
    getTransactionDiagnostics(),
  );

  useEffect(
    () => {
      const timer =
        window.setInterval(
          () =>
            setDiagnostics(
              getTransactionDiagnostics(),
            ),
          500,
        );

      return () =>
        window.clearInterval(
          timer,
        );
    },
    [],
  );

  void listTransactionStates;

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Global transaction fabric
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        Transaction / Saga Workbench
      </div>

      <div className="mt-1 text-sm text-slate-500">
        Transaction state, recovery, idempotency, checkpoints, and saga execution.
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          Transactions:{" "}
          {diagnostics.transactionDefinitionCount}
        </div>

        <div>
          Sagas:{" "}
          {diagnostics.sagaCount}
        </div>

        <div>
          Checkpoints:{" "}
          {diagnostics.checkpointCount}
        </div>

        <div>
          Recovery actions:{" "}
          {diagnostics.recoveryActionCount}
        </div>
      </div>
    </section>
  );
}
