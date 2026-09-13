import {
  getOperatorActivityState,
} from "../../../application/operatorActivity/state/operatorActivityStore";

export function OperatorActivityTimeline() {
  const state = getOperatorActivityState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Operator activity
      </div>

      <div className="mt-3 space-y-2">
        {state.items.slice(0, 20).map((item) => (
          <div
            key={item.id}
            className="rounded-lg border border-slate-800/60 px-3 py-2"
          >
            <div className="text-xs text-slate-300">
              {item.action}
            </div>
            <div className="mt-1 text-[11px] text-slate-500">
              {item.principal ?? "unknown"} ·{" "}
              {item.outcome} ·{" "}
              {item.occurredAt}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
