import {
  getCommandQueryDiagnostics,
} from "../../../application/commandQuery/diagnostics/commandQueryDiagnostics";

export function CommandWorkbenchStatus() {
  const diagnostics =
    getCommandQueryDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        Control plane runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          Command state:{" "}
          {diagnostics
            .commandExecution
            .status}
        </div>

        <div>
          Query state:{" "}
          {diagnostics
            .queryExecution
            .status}
        </div>

        <div>
          History:{" "}
          {diagnostics.historyCount}
        </div>

        <div>
          Commands:{" "}
          {diagnostics.commandCount}
        </div>
      </div>
    </section>
  );
}
