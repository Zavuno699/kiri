import {
  getHandlerDiagnostics,
} from "../../../application/handlers/canonical/diagnostics/handlerDiagnostics";

export function HandlerGraphPanel() {
  const diagnostics =
    getHandlerDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Application handler graph
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Commands: {diagnostics.commands}
        </div>
        <div>
          Queries: {diagnostics.queries}
        </div>
        <div>
          Events: {diagnostics.events}
        </div>
      </div>
    </section>
  );
}
