import {
  useEffect,
  useState,
} from "react";

import {
  getObservabilityDiagnostics,
} from "../../../application/observability/diagnostics/observabilityDiagnostics";

import {
  subscribeObservability,
} from "../../../application/observability/state/observabilityStateStore";

export function ObservabilityWorkbenchHeader() {
  const [
    diagnostics,
    setDiagnostics,
  ] = useState(
    getObservabilityDiagnostics(),
  );

  useEffect(
    () =>
      subscribeObservability(
        () =>
          setDiagnostics(
            getObservabilityDiagnostics(),
          ),
      ),
    [],
  );

  return (
    <section className="rounded-xl border border-slate-700/60 bg-slate-950/60 p-5">
      <div className="text-xs uppercase tracking-[0.18em] text-blue-300/70">
        Global observability fabric
      </div>

      <div className="mt-2 text-xl font-semibold text-slate-100">
        Audit / Observability Workbench
      </div>

      <div className="mt-1 text-sm text-slate-500">
        End-to-end visibility across commands, events, projections, and state.
      </div>

      <div className="mt-4 grid gap-2 text-xs text-slate-400 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          Audit:{" "}
          {diagnostics.auditCount}
        </div>

        <div>
          Spans:{" "}
          {diagnostics.spanCount}
        </div>

        <div>
          Telemetry:{" "}
          {diagnostics.telemetryCount}
        </div>

        <div>
          Health:{" "}
          {diagnostics.healthCount}
        </div>

        <div>
          Open anomalies:{" "}
          {diagnostics.openAnomalyCount}
        </div>
      </div>
    </section>
  );
}
