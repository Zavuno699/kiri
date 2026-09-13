import {
  getVisibleNavigationItems,
} from "../../../application/navigation/guards/navigationVisibility";

export function NavigationSidebarStatus() {
  const items =
    getVisibleNavigationItems();

  return (
    <div className="text-[11px] text-slate-500">
      {items.length} operational destinations
    </div>
  );
}
