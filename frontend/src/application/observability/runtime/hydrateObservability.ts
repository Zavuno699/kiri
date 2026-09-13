import {
  setObservabilityState,
} from "../state/observabilityStateStore";

import {
  selectAuditTimeline,
} from "../selectors/selectAuditTimeline";

import {
  selectTraceSpans,
} from "../selectors/selectTraceSpans";

import {
  selectTelemetry,
} from "../selectors/selectTelemetry";

import {
  selectHealthSignals,
} from "../selectors/selectHealthSignals";

import {
  selectAnomalies,
} from "../selectors/selectAnomalies";

export function hydrateObservability(
  options: {
    traceId?: string | null;
    entityId?: string | null;
    domain?: string | null;
  } = {},
): void {
  setObservabilityState({
    loading:
      true,
    error:
      null,
  });

  const audit =
    selectAuditTimeline(
      options.domain ??
        undefined,
    );

  const spans =
    selectTraceSpans(
      options.traceId ??
        undefined,
    );

  const telemetry =
    selectTelemetry(
      options.domain ??
        undefined,
    );

  const health =
    selectHealthSignals(
      options.domain ??
        undefined,
    );

  const anomalies =
    selectAnomalies(
      options.domain ??
        undefined,
    );

  setObservabilityState({
    selectedTraceId:
      options.traceId ??
      null,

    selectedEntityId:
      options.entityId ??
      null,

    selectedDomain:
      options.domain ??
      null,

    auditIds:
      audit.map(
        (record) =>
          record.id,
      ),

    spanIds:
      spans.map(
        (span) =>
          span.id,
      ),

    telemetryIds:
      telemetry.map(
        (signal) =>
          signal.id,
      ),

    healthIds:
      health.map(
        (signal) =>
          signal.id,
      ),

    anomalyIds:
      anomalies.map(
        (anomaly) =>
          anomaly.id,
      ),

    loading:
      false,

    error:
      null,
  });
}
