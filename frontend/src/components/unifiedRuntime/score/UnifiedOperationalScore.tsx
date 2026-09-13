import {
  getUnifiedRuntimeState,
} from "../../../application/unifiedRuntime/state/unifiedRuntimeStore";

export function UnifiedOperationalScore() {
  const state =
    getUnifiedRuntimeState();

  const score = Math.round(
    (
      state.consistencyScore +
      state.domainHealthScore
    ) / 2,
  );

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Unified operational score
      </div>

      <div className="mt-3 text-4xl font-semibold text-slate-100">
        {score}
      </div>
    </section>
  );
}
