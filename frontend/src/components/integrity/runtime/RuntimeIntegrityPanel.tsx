import {
  getRuntimeIntegrityState,
} from "../../../application/runtimeIntegrity/state/runtimeIntegrityStore";

export function RuntimeIntegrityPanel() {
  const state = getRuntimeIntegrityState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Runtime integrity
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400">
        <div>
          Runtime ready: {String(state.runtimeReady)}
        </div>
        <div>
          Cache consistent: {String(state.cacheConsistent)}
        </div>
        <div>
          Recovery active: {String(state.recoveryActive)}
        </div>
        <div>
          Reconciliation healthy:{" "}
          {String(state.reconciliationHealthy)}
        </div>
        <div>
          Degraded: {String(state.degraded)}
        </div>
      </div>

      {state.reasons.length > 0 ? (
        <div className="mt-3 text-[11px] text-amber-200">
          {state.reasons.join(", ")}
        </div>
      ) : null}
    </section>
  );
}
