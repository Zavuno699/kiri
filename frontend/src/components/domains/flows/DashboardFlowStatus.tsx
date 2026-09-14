import {
  getDashboardFlowDiagnostics,
} from "../../../features/dashboard/flows/diagnostics/getDashboardFlowDiagnostics";

export function DashboardFlowStatus() {
  const diagnostics =
    getDashboardFlowDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Dashboard application flow
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Query capability:{" "}
        {String(diagnostics.queryCapability)}
      </div>
    </section>
  );
}
