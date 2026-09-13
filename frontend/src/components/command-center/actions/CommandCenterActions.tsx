import {
  listCommandCenterActions,
} from "../../../application/commandCenter/registry/commandCenterActionRegistry";

export function CommandCenterActions() {
  const actions =
    listCommandCenterActions();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Command center actions
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
