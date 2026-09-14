import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function GlobalDegradedModePanel() {
  const state =
    getDegradedModeState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Global operating mode
      </div>

      <div className="mt-2 text-xs text-slate-400">
        {state.active ? "Degraded" : "Normal"}
      </div>

      {state.reason ? (
        <div className="mt-1 text-[11px] text-slate-500">
          {state.reason}
        </div>
      ) : null}
    </section>
  );
}
