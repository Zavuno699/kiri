import {
  getConsistencyState,
} from "../../../application/consistency/state/consistencyStore";

export function ConsistencyScorePanel() {
  const score =
    getConsistencyState().snapshot?.score ?? 0;

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Consistency score
      </div>
      <div className="mt-3 text-3xl font-semibold text-slate-100">
        {score}
      </div>
    </section>
  );
}
