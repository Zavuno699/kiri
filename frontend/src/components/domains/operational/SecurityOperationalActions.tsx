import {
  createSecurityViewModel,
} from "../../../features/security/ui/runtime/createSecurityViewModel";

export function SecurityOperationalActions() {
  const model =
    createSecurityViewModel();

  return (
    <div className="flex flex-wrap gap-2">
      {model.actions.map(
        (action) => (
          <div
            key={action.id}
            className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300"
          >
            {action.label}
          </div>
        ),
      )}
    </div>
  );
}
