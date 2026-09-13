import {
  getLocksFlowDiagnostics,
} from "../../../features/locks/flows/diagnostics/getLocksFlowDiagnostics";

export function LocksFlowStatus() {
  const diagnostics =
    getLocksFlowDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Locks application flow
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Read capability:{" "}
        {diagnostics.readCapability}
      </div>
    </section>
  );
}
