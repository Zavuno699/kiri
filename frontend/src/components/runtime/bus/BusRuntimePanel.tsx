import {
  getBusDiagnostics,
} from "../../../application/busRuntime/diagnostics/busDiagnostics";

export function BusRuntimePanel() {
  const diagnostics =
    getBusDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Application buses
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Commands:{" "}
          {diagnostics.runtime.commandHandlers}
        </div>
        <div>
          Queries:{" "}
          {diagnostics.runtime.queryHandlers}
        </div>
        <div>
          Events:{" "}
          {diagnostics.runtime.eventHandlers}
        </div>
      </div>
    </section>
  );
}
