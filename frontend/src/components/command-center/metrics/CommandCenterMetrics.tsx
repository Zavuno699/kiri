import {
  getCommandCenterState,
} from "../../../application/commandCenter/state/commandCenterStore";

export function CommandCenterMetrics() {
  const state =
    getCommandCenterState();

  const metrics = [
    ["Critical", state.criticalCount],
    ["Warnings", state.warningCount],
    ["Info", state.infoCount],
  ] as const;

  return (
    <section className="grid gap-3 sm:grid-cols-3">
      {metrics.map(
        ([label, value]) => (
          <div
            key={label}
            className="rounded-xl border border-slate-800 bg-slate-950/50 p-4"
          >
            <div className="text-xs text-slate-500">
              {label}
            </div>

            <div className="mt-2 text-2xl font-semibold text-slate-100">
              {value}
            </div>
          </div>
        ),
      )}
    </section>
  );
}
