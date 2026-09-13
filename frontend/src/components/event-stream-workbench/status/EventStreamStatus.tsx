import {
  getEventStreamCoverage,
} from "../../../application/eventStream/diagnostics/eventStreamCoverage";

export function EventStreamStatus() {
  const coverage =
    getEventStreamCoverage();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        Event fabric status
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          Event types:{" "}
          {coverage.eventDefinitions}
        </div>

        <div>
          Projections:{" "}
          {coverage.projections}
        </div>

        <div>
          Traceability:{" "}
          {coverage.traceabilityReady
            ? "ready"
            : "pending"}
        </div>

        <div>
          Fabric:{" "}
          {coverage.ready
            ? "ready"
            : "pending"}
        </div>
      </div>
    </section>
  );
}
