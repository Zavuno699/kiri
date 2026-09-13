import {
  listRecoveries,
} from "../../../application/commandCenter/recovery/recoveryStore";

export function RecoveryPanel() {
  const recoveries =
    listRecoveries();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Recovery operations
      </div>

      <div className="mt-3 space-y-2">
        {recoveries.map(
          (recovery) => (
            <div
              key={recovery.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs font-medium text-slate-300">
                {recovery.action}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {recovery.domain} ·{" "}
                {recovery.status}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
