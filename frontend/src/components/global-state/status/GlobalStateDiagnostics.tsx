import {
  getGlobalStateDiagnostics,
} from "../../../application/globalState/diagnostics/globalStateDiagnostics";

export function GlobalStateDiagnostics() {
  const diagnostics =
    getGlobalStateDiagnostics();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Global state diagnostics
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-3">
        <div>
          Slices:{" "}
          {diagnostics.sliceCount}
        </div>

        <div>
          Events:{" "}
          {diagnostics.eventCount}
        </div>

        <div>
          Effects:{" "}
          {diagnostics.effectCount}
        </div>
      </div>
    </section>
  );
}
