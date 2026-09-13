import {
  getConsistencyState,
} from "../../../application/consistency/state/consistencyStore";

export function ConsistencyCheckList() {
  const checks =
    getConsistencyState().snapshot?.checks ?? [];

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Consistency checks
      </div>

      <div className="mt-3 space-y-2">
        {checks.map((check) => (
          <div
            key={check.key}
            className="flex items-center justify-between rounded-lg border border-slate-800/60 px-3 py-2"
          >
            <div>
              <div className="text-xs text-slate-300">
                {check.key}
              </div>
              <div className="mt-1 text-[11px] text-slate-500">
                {check.reason}
              </div>
            </div>

            <div className="text-[11px] text-slate-400">
              {check.score}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
