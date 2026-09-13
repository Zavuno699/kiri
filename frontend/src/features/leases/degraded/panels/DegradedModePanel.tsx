import {
  getDegradedModeState,
} from "../../../application/degradedMode/state/degradedModeStore";

export function DegradedModePanel() {
  const state =
    getDegradedModeState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/30 p-4">
      <div className="text-sm font-semibold">
        Leases availability
      </div>
      <div className="mt-2 text-xs text-slate-400">
        Mode: {state.mode}
      </div>
    </section>
  );
}
