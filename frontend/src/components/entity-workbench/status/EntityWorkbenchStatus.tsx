import {
  getWorkbenchDiagnostics,
} from "../../../application/operationalViews/diagnostics/getWorkbenchDiagnostics";

export function EntityWorkbenchStatus() {
  const diagnostics =
    getWorkbenchDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        Workbench runtime
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          Related:{" "}
          {diagnostics.relatedCount}
        </div>

        <div>
          Relationships:{" "}
          {diagnostics.relationshipCount}
        </div>

        <div>
          Dependencies:{" "}
          {diagnostics.dependencyCount}
        </div>

        <div>
          Loading:{" "}
          {diagnostics.loading
            ? "yes"
            : "no"}
        </div>

        <div>
          Error:{" "}
          {diagnostics.error ??
            "none"}
        </div>
      </div>
    </section>
  );
}
