import {
  getWorkspaceDiagnostics,
} from "../../../application/workspace/diagnostics/workspaceDiagnostics";

export function WorkspaceSearchPanel() {
  const diagnostics =
    getWorkspaceDiagnostics();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Cross-domain search
      </div>

      <div className="mt-2 text-xs text-slate-500">
        Results:{" "}
        {diagnostics.searchResultCount}
      </div>
    </section>
  );
}
