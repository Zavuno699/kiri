import {
  listPageRuntimeStates,
} from "../../../application/ui/state/pageRuntimeStore";

export function PageRuntimeOverview() {
  const states =
    Array.from(listPageRuntimeStates().entries());

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Page runtime
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
        {states.map(
          ([key, state]) => (
            <div
              key={key}
              className="rounded-lg border border-slate-800 bg-slate-950/60 p-3"
            >
              <div className="text-xs font-medium text-slate-300">
                {key}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {state.ready ? "ready" : state.loading ? "loading" : state.error ? "error" : "idle"}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
