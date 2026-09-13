import {
  getWorkspaceSnapshot,
} from "../../application/workspace/diagnostics/workspaceSnapshot";

export function WorkspaceHeader() {
  const state =
    getWorkspaceSnapshot();

  return (
    <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-800 pb-5">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500">
          KiriLock
        </div>

        <h1 className="mt-1 text-2xl font-semibold text-slate-100">
          Operator Workspace
        </h1>

        <div className="mt-1 text-xs text-slate-500">
          {state.operational
            ? "Operational"
            : "Restricted"}
        </div>
      </div>

      <div className="text-xs text-slate-500">
        Mode: {state.commandMode}
      </div>
    </header>
  );
}
