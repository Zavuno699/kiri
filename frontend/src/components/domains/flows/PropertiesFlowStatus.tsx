import {
  getPropertiesFlowDiagnostics,
} from "../../../features/properties/flows/diagnostics/getPropertiesFlowDiagnostics";

export function PropertiesFlowStatus() {
  const diagnostics =
    getPropertiesFlowDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Properties application flow
      </div>

      <div className="mt-2 text-xs text-slate-400">
        Query capability:{" "}
        {String(diagnostics.queryCapability)}
      </div>
    </section>
  );
}
