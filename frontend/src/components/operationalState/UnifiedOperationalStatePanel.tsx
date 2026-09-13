import {
  getUnifiedOperationalState,
} from "../../application/operationalState/operationalStateStore";

export function UnifiedOperationalStatePanel() {
  const state =
    getUnifiedOperationalState();

  if (!state) {
    return (
      <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
        <div className="text-sm font-semibold">
          Unified operational state
        </div>
        <div className="mt-2 text-xs text-slate-500">
          State not initialized.
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Unified operational state
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Runtime: {state.runtime.status}
        </div>
        <div>
          Operator: {String(state.operator.operatorReady)}
        </div>
        <div>
          Mode: {state.degradedMode.mode}
        </div>
        <div>
          Health: {state.health.score}
        </div>
        <div>
          Consistency:{" "}
          {state.consistency.snapshot?.score ?? 0}
        </div>
        <div>
          Workflows:{" "}
          {state.workflows.executions.length}
        </div>
      </div>
    </section>
  );
}
