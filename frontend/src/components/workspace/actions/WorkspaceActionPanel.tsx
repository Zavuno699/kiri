import {
  getWorkspaceState,
} from "../../application/workspace/state/workspaceStore";

import {
  getAvailableWorkspaceActions,
} from "../../application/workspace/runtime/getAvailableWorkspaceActions";

export function WorkspaceActionPanel() {
  const state =
    getWorkspaceState();

  const actions =
    state.selectedDomain
      ? getAvailableWorkspaceActions(
          state.selectedDomain,
        )
      : [];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Available actions
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {actions.map(
          (action) => (
            <div
              key={action.key}
              className="rounded-lg border border-slate-800 px-3 py-2 text-xs text-slate-300"
            >
              {action.label}
            </div>
          ),
        )}
      </div>
    </section>
  );
}
