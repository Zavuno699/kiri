import {
  getApplicationConvergenceDiagnostics,
} from "../../../application/flows/diagnostics/convergenceDiagnostics";

export function ApplicationFlowConvergencePanel() {
  const diagnostics =
    getApplicationConvergenceDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Application convergence
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-4">
        <div>
          Domains:{" "}
          {diagnostics.flows.domainCount}
        </div>

        <div>
          API resources:{" "}
          {diagnostics.api.total}
        </div>

        <div>
          Projections:{" "}
          {diagnostics.projections.projectionCount}
        </div>

        <div>
          Ready:{" "}
          {diagnostics.convergenceReady
            ? "yes"
            : "pending"}
        </div>
      </div>
    </section>
  );
}
