import {
  listStateSlices,
} from "../../../application/globalState/registry/stateSliceRegistry";

export function GlobalStateSlices() {
  const slices =
    listStateSlices();

  return (
    <section className="rounded-xl border border-slate-800 bg-slate-950/50 p-4">
      <div className="text-sm font-semibold">
        State slices
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {slices.map(
          (slice) => (
            <div
              key={slice.key}
              className="rounded-lg border border-slate-800 p-3"
            >
              <div className="text-xs text-slate-300">
                {slice.domain}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                v{slice.version}
              </div>
            </div>
          ),
        )}
      </div>
    </section>
  );
}
