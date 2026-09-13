import {
  getUnifiedRuntimeState,
} from "../../../application/unifiedRuntime/state/unifiedRuntimeStore";

export function RuntimeReasonPanel() {
  const reasons =
    getUnifiedRuntimeState().reasons;

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Runtime conditions
      </div>

      {reasons.length === 0 ? (
        <div className="mt-2 text-xs text-slate-500">
          No active runtime restrictions.
        </div>
      ) : (
        <div className="mt-3 space-y-1">
          {reasons.map((reason) => (
            <div
              key={reason}
              className="text-xs text-amber-200"
            >
              {reason}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
