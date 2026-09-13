import {
  listFeatureRuntimes,
} from "../../../application/featureRuntime/registry/featureRuntimeRegistry";

export function FeatureRuntimePanel() {
  const runtimes =
    listFeatureRuntimes();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Feature runtime registry
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {runtimes.map((runtime) => (
          <div
            key={runtime.domain}
            className="rounded-lg border border-slate-800/60 p-3"
          >
            <div className="text-xs text-slate-300">
              {runtime.domain}
            </div>

            <div className="mt-1 text-[11px] text-slate-500">
              {runtime.initialized
                ? "initialized"
                : "pending"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
