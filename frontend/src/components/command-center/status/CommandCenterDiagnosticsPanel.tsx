import {
  getCommandCenterDiagnostics,
} from "../../../application/commandCenter/diagnostics/commandCenterDiagnostics";

import {
  getIncidentDiagnostics,
} from "../../../application/commandCenter/diagnostics/incidentDiagnostics";

import {
  getRecoveryDiagnostics,
} from "../../../application/commandCenter/diagnostics/recoveryDiagnostics";

export function CommandCenterDiagnosticsPanel() {
  const commandCenter =
    getCommandCenterDiagnostics();

  const incidents =
    getIncidentDiagnostics();

  const recoveries =
    getRecoveryDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Operational diagnostics
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div>
          Open incidents:{" "}
          {incidents.open}
        </div>

        <div>
          Active recoveries:{" "}
          {recoveries.active}
        </div>

        <div>
          Timeline entries:{" "}
          {commandCenter.timelineCount}
        </div>
      </div>
    </section>
  );
}
