import {
  getNavigationConvergence,
} from "../../../application/navigation/diagnostics/navigationConvergence";

export function NavigationConvergencePanel() {
  const state =
    getNavigationConvergence();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Navigation convergence
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4 text-xs text-slate-400">
        <div>
          Canonical routes:{" "}
          {state.coverage.canonicalRouteCount}
        </div>

        <div>
          Metadata routes:{" "}
          {state.coverage.metadataRouteCount}
        </div>

        <div>
          Guarded:{" "}
          {state.coverage.guarded}
        </div>

        <div>
          Converged:{" "}
          {state.converged
            ? "yes"
            : "pending"}
        </div>
      </div>
    </section>
  );
}
