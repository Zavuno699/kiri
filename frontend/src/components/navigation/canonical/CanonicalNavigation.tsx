import {
  getNavigationMenuModel,
} from "../../../application/navigation/menu/navigationMenuModel";

export function CanonicalNavigation() {
  const groups =
    getNavigationMenuModel();

  return (
    <nav className="space-y-4">
      {groups.map(
        (group) => (
          <div
            key={group.key}
          >
            <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-slate-500">
              {group.label}
            </div>

            <div className="space-y-1">
              {group.items.map(
                (item) => (
                  <div
                    key={item.key}
                    className="rounded-lg px-3 py-2 text-xs text-slate-300"
                  >
                    {item.label}
                  </div>
                ),
              )}
            </div>
          </div>
        ),
      )}
    </nav>
  );
}
