import {
  getNavigationSnapshot,
} from "../../../application/navigation/diagnostics/navigationSnapshot";

export function NavigationRuntimePanel() {
  const snapshot =
    getNavigationSnapshot();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Navigation runtime
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5 text-xs text-slate-400">
        <div>
          Selected:{" "}
          {snapshot.selectedRoute}
        </div>

        <div>
          Items:{" "}
          {snapshot.navigationItems}
        </div>

        <div>
          Routes:{" "}
          {snapshot.routeMetadata}
        </div>

        <div>
          Accessible:{" "}
          {snapshot.accessibleRoutes}
        </div>

        <div>
          Active:{" "}
          {snapshot.activeRoutes}
        </div>
      </div>
    </section>
  );
}
