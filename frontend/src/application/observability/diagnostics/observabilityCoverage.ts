import {
  getObservabilityDiagnostics,
} from "./observabilityDiagnostics";

export function getObservabilityCoverage() {
  const diagnostics =
    getObservabilityDiagnostics();

  return {
    audit:
      diagnostics.auditCount,

    traces:
      diagnostics.spanCount,

    telemetry:
      diagnostics.telemetryCount,

    health:
      diagnostics.healthCount,

    anomalies:
      diagnostics.anomalyCount,

    openAnomalies:
      diagnostics.openAnomalyCount,

    ready:
      true,
  };
}
