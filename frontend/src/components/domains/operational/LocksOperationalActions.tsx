import {
  createLocksViewModel,
} from "../../../features/locks/ui/runtime/createLocksViewModel";

export function LocksOperationalActions() {
  const model =
    createLocksViewModel();

  return (
    <div className="flex flex-wrap gap-2">
      {model.actions.map(
        (action) => (
          <div
            key={action.key}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300"
          >
            {action.label}
          </div>
        ),
      )}
    </div>
  );
}
