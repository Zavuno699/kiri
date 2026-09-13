import {
  getWorkspaceSnapshot,
} from "../../application/workspace/diagnostics/workspaceSnapshot";

export function WorkspaceRuntimePanel() {
  const snapshot =
    getWorkspaceSnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Workspace runtime
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          Domains:{" "}
          {snapshot.domains}
        </div>

        <div>
          Queued:{" "}
          {snapshot.queueItems}
        </div>

        <div>
          Search:{" "}
          {snapshot.searchResults}
        </div>

        <div>
          Status:{" "}
          {snapshot.status}
        </div>
      </div>
    </section>
  );
}
