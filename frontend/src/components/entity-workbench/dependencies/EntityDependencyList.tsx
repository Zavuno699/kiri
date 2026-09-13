import {
  selectEntityDependencies,
} from "../../../application/operationalViews/selectors/selectEntityDependencies";

interface Props {
  domain: string | null;
}

export function EntityDependencyList({
  domain,
}: Props) {
  const dependencies =
    domain
      ? selectEntityDependencies(
          domain,
        )
      : [];

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold text-slate-200">
        Dependencies
      </div>

      <div className="mt-3 space-y-2">
        {dependencies.length ===
        0 ? (
          <div className="text-xs text-slate-500">
            No dependencies resolved.
          </div>
        ) : (
          dependencies.map(
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
          )
        )}
      </div>
    </section>
  );
}
