import {
  getUnifiedRuntimeState,
} from "../../../application/unifiedRuntime/state/unifiedRuntimeStore";

export function UnifiedRuntimeStatusPanel() {
  const state =
    getUnifiedRuntimeState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Unified runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>Status: {state.status}</div>
        <div>Operator ready: {String(state.operatorReady)}</div>
        <div>Mode: {state.degradedMode}</div>
        <div>
          Security: {String(state.securityReady)}
        </div>
        <div>
          Consistency: {state.consistencyScore}
        </div>
        <div>
          Domain health: {state.domainHealthScore}
        </div>
      </div>
    </section>
  );
}
