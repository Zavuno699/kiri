import {
  getWorkspaceDiagnostics,
} from "../../application/workspace/diagnostics/workspaceDiagnostics";

export function WorkspaceStatusPanel() {
  const state =
    getWorkspaceDiagnostics();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Workspace status
      </div>

      <div className="mt-2 grid gap-2 text-xs text-slate-500 sm:grid-cols-3">
        <div>
          Status:{" "}
          {state.state.workspaceStatus}
        </div>

        <div>
          Domain:{" "}
          {state.activeDomain ??
            "none"}
        </div>

        <div>
          Queue:{" "}
          {state.queueCount}
        </div>
      </div>
    </section>
  );
}
