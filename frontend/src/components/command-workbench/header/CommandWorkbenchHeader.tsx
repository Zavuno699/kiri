import {
  useEffect,
  useState,
} from "react";

import {
  getCommandQueryDiagnostics,
} from "../../../application/commandQuery/diagnostics/commandQueryDiagnostics";

import {
  subscribeCommandExecution,
} from "../../../application/commandQuery/state/commandExecutionStore";

import {
  subscribeQueryExecution,
} from "../../../application/commandQuery/state/queryExecutionStore";

export function CommandWorkbenchHeader() {
  const [
    diagnostics,
    setDiagnostics,
  ] = useState(
    getCommandQueryDiagnostics(),
  );

  useEffect(
    () => {
      const refresh =
        () =>
          setDiagnostics(
            getCommandQueryDiagnostics(),
          );

      const unsubscribeCommand =
        subscribeCommandExecution(
          refresh,
        );

      const unsubscribeQuery =
        subscribeQueryExecution(
          refresh,
        );

      return () => {
        unsubscribeCommand();
        unsubscribeQuery();
      };
    },
    [],
  );

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Global control plane
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        Command / Query Workbench
      </div>

      <div className="mt-1 text-sm text-slate-500">
        Centralized operational command and read-only query surfaces.
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Commands:{" "}
          {diagnostics.commandCount}
        </div>

        <div>
          Queries:{" "}
          {diagnostics.queryCount}
        </div>

        <div>
          History:{" "}
          {diagnostics.historyCount}
        </div>
      </div>
    </section>
  );
}
