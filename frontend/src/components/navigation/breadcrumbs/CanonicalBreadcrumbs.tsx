import {
  getSelectedRoute,
} from "../../../application/navigation/state/navigationStore";

import {
  buildBreadcrumbs,
} from "../../../application/navigation/breadcrumbs/buildBreadcrumbs";

export function CanonicalBreadcrumbs() {
  const breadcrumbs =
    buildBreadcrumbs(
      getSelectedRoute(),
    );

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
      {breadcrumbs.map(
        (item, index) => (
          <span
            key={`${item.label}-${index}`}
          >
            {item.label}
          </span>
        ),
      )}
    </div>
  );
}
