import {
  getObservabilityCoverage,
} from "../../../application/observability/diagnostics/observabilityCoverage";

export function ObservabilityStatus() {
  const coverage =
    getObservabilityCoverage();

  return (
    <section className="rounded-xl border border-slate-700/50 bg-slate-950/40 p-4">
      <div className="text-xs uppercase tracking-wider text-slate-500">
        Observability status
      </div>

      <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-6">
        <div>
          Audit:{" "}
          {coverage.audit}
        </div>

        <div>
          Traces:{" "}
          {coverage.traces}
        </div>

        <div>
          Telemetry:{" "}
          {coverage.telemetry}
        </div>

        <div>
          Health:{" "}
          {coverage.health}
        </div>

        <div>
          Anomalies:{" "}
          {coverage.anomalies}
        </div>

        <div>
          Open:{" "}
          {coverage.openAnomalies}
        </div>
      </div>
    </section>
  );
}
