import {
  selectCommandDrifted,
} from "../../../application/commandReconciliation/selectors/commandReconciliationSelectors";
import type {
  CommandReconciliationState,
} from "../../../application/commandReconciliation/commandReconciliationState";

interface CommandIntegrityPanelProps {
  state: CommandReconciliationState;
}

export function CommandIntegrityPanel({
  state,
}: CommandIntegrityPanelProps) {
  const drifted = selectCommandDrifted(state);

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Command integrity
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Status: {state.status}
      </div>

      <div className="mt-1 text-[11px] text-slate-500">
        Drifted: {String(drifted)}
      </div>
    </section>
  );
}
