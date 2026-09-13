import {
  getDataFabricCoverage,
} from "../../../application/dataFabric/diagnostics/dataFabricCoverage";

export function DataFabricStatus() {
  const coverage =
    getDataFabricCoverage();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-sm font-semibold">
        Data fabric status
      </div>

      <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-5 text-xs text-slate-400">
        <div>
          Entities:{" "}
          {coverage.entityTypes}
        </div>

        <div>
          Relationships:{" "}
          {coverage.relationships}
        </div>

        <div>
          Dependencies:{" "}
          {coverage.dependencies}
        </div>

        <div>
          Graph nodes:{" "}
          {coverage.graphNodes}
        </div>

        <div>
          Connected:{" "}
          {coverage.connected
            ? "yes"
            : "pending"}
        </div>
      </div>
    </section>
  );
}
