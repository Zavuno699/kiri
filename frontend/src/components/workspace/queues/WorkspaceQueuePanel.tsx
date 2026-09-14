import {
  listWorkspaceQueueItems,
} from "../../../application/workspace/queues/workspaceQueueStore";

export function WorkspaceQueuePanel() {
  const items =
    listWorkspaceQueueItems();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold text-slate-200">
          Operational queue
        </div>

        <div className="text-xs text-slate-500">
          {items.length}
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {items.map(
          (item: { id: string; domain: string; action: string }) => (
            <div
              key={item.id}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs font-medium text-slate-300">
                {item.action}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {item.domain}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
