import {
  getReconciliationState,
} from "../../../application/reconciliation/state/reconciliationStore";

export function ReconciliationStatusPanel() {
  const state = getReconciliationState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Reconciliation state
      </div>

      <div className="mt-3 grid gap-1 text-xs text-slate-400">
        <div>Status: {state.status}</div>
        <div>Checked: {state.totalChecked}</div>
        <div>Consistent: {state.consistent}</div>
        <div>Stale: {state.stale}</div>
        <div>Conflicted: {state.conflicted}</div>
        <div>Missing: {state.missing}</div>
      </div>
    </section>
  );
}
