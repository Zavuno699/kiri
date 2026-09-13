import {
  OPERATOR_NAVIGATION_CATALOG,
} from "../../../application/operatorNavigation/navigationCatalog";
import {
  filterOperatorNavigation,
} from "../../../application/operatorNavigation/filtering/filterNavigation";

export function RoleAwareNavigation() {
  const items = filterOperatorNavigation(
    OPERATOR_NAVIGATION_CATALOG,
  );

  return (
    <nav className="flex flex-wrap gap-2">
      {items.map((item) => (
        <a
          key={item.key}
          href={item.path}
          className="rounded-lg border border-slate-700/50 px-3 py-2 text-xs text-slate-300"
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}
