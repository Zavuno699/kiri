import {
  getCanonicalGraphDiagnostics,
} from "../../../application/canonicalGraph/canonicalGraphDiagnostics";

export function ApplicationGraphPanel() {
  const diagnostics =
    getCanonicalGraphDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Application graph
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
        <div>
          Graph ready:{" "}
          {String(diagnostics.ready)}
        </div>
        <div>
          Services:{" "}
          {diagnostics.services.initialized}/
          {diagnostics.services.required}
        </div>
        <div>
          Providers:{" "}
          {diagnostics.providers.initialized}/
          {diagnostics.providers.required}
        </div>
      </div>
    </section>
  );
}
