import {
  getConsistencyState,
} from "../../../application/consistency/state/consistencyStore";

export function ConsistencySummaryPanel() {
  const state = getConsistencyState();
  const snapshot = state.snapshot;

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Frontend consistency
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-4">
        <div>Status: {snapshot?.status ?? "unknown"}</div>
        <div>Score: {snapshot?.score ?? 0}</div>
        <div>Checks: {snapshot?.totalChecks ?? 0}</div>
        <div>Failures: {snapshot?.failedChecks ?? 0}</div>
      </div>
    </section>
  );
}
