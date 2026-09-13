import {
  getOperatorActivityState,
} from "../../../application/operatorActivity/state/operatorActivityStore";

export function OperatorActivityMetrics() {
  const state = getOperatorActivityState();

  const denied = state.items.filter(
    (item) => item.outcome === "denied",
  ).length;

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Activity metrics
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Activities: {state.items.length}
      </div>

      <div className="mt-1 text-xs text-slate-500">
        Denied: {denied}
      </div>
    </section>
  );
}
