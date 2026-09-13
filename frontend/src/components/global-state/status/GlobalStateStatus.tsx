import {
  getGlobalStateSnapshot,
} from "../../../application/globalState/diagnostics/globalStateSnapshot";

export function GlobalStateStatus() {
  const state =
    getGlobalStateSnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Global state
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Operational:{" "}
          {state.operational
            ? "yes"
            : "no"}
        </div>

        <div>
          Domain:{" "}
          {state.activeDomain ??
            "none"}
        </div>

        <div>
          Route:{" "}
          {state.activeRoute}
        </div>
      </div>
    </section>
  );
}
