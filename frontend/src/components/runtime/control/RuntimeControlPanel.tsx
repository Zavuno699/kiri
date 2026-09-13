import {
  getUnifiedRuntimeDiagnostics,
} from "../../../application/runtime/diagnostics/unifiedRuntimeDiagnostics";

export function RuntimeControlPanel() {
  const diagnostics =
    getUnifiedRuntimeDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-sm font-semibold">
            Unified runtime control
          </div>

          <div className="mt-1 text-xs text-slate-400">
            {diagnostics.safeMode
              ? "SAFE MODE"
              : diagnostics.operational
                ? "OPERATIONAL"
                : diagnostics.control.degraded
                  ? "DEGRADED"
                  : "STARTING"}
          </div>
        </div>

        <div className="text-xs text-slate-500">
          {diagnostics.readySubsystemCount} ready
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        {diagnostics.subsystems.map(
          (subsystem) => (
            <div
              key={subsystem.subsystem}
              className="rounded-lg border border-slate-800 bg-slate-950/50 p-3"
            >
              <div className="text-xs font-medium text-slate-300">
                {subsystem.subsystem}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {subsystem.ready
                  ? "ready"
                  : subsystem.degraded
                    ? "degraded"
                    : "not ready"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
