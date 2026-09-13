import {
  OPERATOR_ACTION_CATALOG,
} from "../../../application/operatorActions/actionCatalog";
import {
  filterVisibleActions,
} from "../../../application/operatorActions/visibility/filterVisibleActions";

export function RoleAwareActionList() {
  const actions = filterVisibleActions(
    OPERATOR_ACTION_CATALOG,
  );

  return (
    <div className="flex flex-wrap gap-2">
      {actions.map((action) => (
        <span
          key={action.key}
          className="rounded-md border border-slate-700/50 px-2 py-1 text-[11px] text-slate-400"
        >
          {action.label}
        </span>
      ))}
    </div>
  );
}
