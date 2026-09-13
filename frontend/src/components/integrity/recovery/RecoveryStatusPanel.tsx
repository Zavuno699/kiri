import {
  getRecoveryState,
} from "../../../application/recovery/state/recoveryStore";

export function RecoveryStatusPanel() {
  const state = getRecoveryState();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Recovery state
      </div>
      <div className="mt-2 text-xs text-slate-400">
        {state.status}
      </div>
      {state.lastReason ? (
        <div className="mt-1 text-[11px] text-slate-500">
          {state.lastReason}
        </div>
      ) : null}
    </section>
  );
}
