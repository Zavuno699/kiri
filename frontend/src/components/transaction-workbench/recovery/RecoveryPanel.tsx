import {
  listRecoveryActions,
} from "../../../application/transactionFabric/recovery/recoveryRegistry";

export function RecoveryPanel() {
  const actions =
    listRecoveryActions();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Recovery strategies
      </div>

      <div className="mt-3 space-y-2">
        {actions.map(
          (action) => (
            <div
              key={action.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-200">
                {action.action}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {action.strategy}
                {" · "}
                {action.domain}
              </div>

              <div className="mt-1 text-[10px] text-slate-600">
                {action.reason}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
