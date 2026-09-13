import {
  getGlobalStateConvergence,
} from "../../../application/globalState/diagnostics/globalStateConvergence";

export function GlobalStateConvergencePanel() {
  const state =
    getGlobalStateConvergence();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Global state convergence
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3 text-xs text-slate-400">
        <div>
          Slices:{" "}
          {state.coverage.slices}
        </div>

        <div>
          Effects:{" "}
          {state.coverage.effects}
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
