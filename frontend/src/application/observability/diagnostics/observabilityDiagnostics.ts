import {
  listAuditRecords,
} from "../audit/auditStore";

import {
  listTraceSpans,
} from "../tracing/traceStore";

import {
  listTelemetry,
} from "../telemetry/telemetryStore";

import {
  listHealthSignals,
} from "../health/healthStore";

import {
  listAnomalies,
} from "../anomalies/anomalyStore";

import {
  getObservabilityState,
} from "../state/observabilityStateStore";

export function getObservabilityDiagnostics() {
  const anomalies =
    listAnomalies();

  return {
    auditCount:
      listAuditRecords().length,

    spanCount:
      listTraceSpans().length,

    telemetryCount:
      listTelemetry().length,

    healthCount:
      listHealthSignals().length,

    anomalyCount:
      anomalies.length,

    openAnomalyCount:
      anomalies.filter(
        (item) =>
          !item.resolved,
      ).length,

    state:
      getObservabilityState(),
  };
}
