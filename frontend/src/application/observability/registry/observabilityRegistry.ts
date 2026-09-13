import {
  appendAuditRecord,
} from "../audit/auditStore";

import {
  recordTelemetry,
} from "../telemetry/telemetryStore";

import {
  recordHealthSignal,
} from "../health/healthStore";

import {
  appendAnomaly,
} from "../anomalies/anomalyStore";

import {
  startTraceSpan,
} from "../tracing/traceStore";

export const observabilityRegistry = {
  audit:
    appendAuditRecord,

  telemetry:
    recordTelemetry,

  health:
    recordHealthSignal,

  anomaly:
    appendAnomaly,

  trace:
    startTraceSpan,
};
