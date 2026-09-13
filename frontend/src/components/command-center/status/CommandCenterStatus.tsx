import {
  getCommandCenterDiagnostics,
} from "../../../application/commandCenter/diagnostics/commandCenterDiagnostics";

export function CommandCenterStatus() {
  const diagnostics =
    getCommandCenterDiagnostics();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Command center status
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
        <div>
          Incidents:{" "}
          {diagnostics.incidentCount}
        </div>

        <div>
          Recoveries:{" "}
          {diagnostics.recoveryCount}
        </div>

        <div>
          Actions:{" "}
          {diagnostics.actionCount}
        </div>
      </div>
    </section>
  );
}
