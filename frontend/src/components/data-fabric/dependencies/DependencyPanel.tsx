import {
  listDataDependencies,
} from "../../../application/dataFabric/dependencies/dependencyStore";

export function DependencyPanel() {
  const dependencies =
    listDataDependencies();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        Data dependencies
      </div>

      <div className="mt-3 space-y-2">
        {dependencies
          .slice(0, 10)
          .map(
            (dependency) => (
              <div
                key={dependency.id}
                className="rounded-lg border border-slate-800 p-3"
              >
                <div className="text-xs text-slate-300">
                  {dependency.sourceDomain}
                  {" → "}
                  {dependency.targetDomain}
                </div>

                <div className="mt-1 text-[11px] text-slate-500">
                  {dependency.reason}
                </div>
              </div>
            ),
          )}
      </div>
    </section>
  );
}
