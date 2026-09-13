import {
  selectAuditTimeline,
} from "../selectors/selectAuditTimeline";

import {
  selectTelemetry,
} from "../selectors/selectTelemetry";

import {
  selectHealthSignals,
} from "../selectors/selectHealthSignals";

import {
  selectAnomalies,
} from "../selectors/selectAnomalies";

export function getPaymentsObservability() {
  return {
    audit:
      selectAuditTimeline(
        "payments",
      ),
    telemetry:
      selectTelemetry(
        "payments",
      ),
    health:
      selectHealthSignals(
        "payments",
      ),
    anomalies:
      selectAnomalies(
        "payments",
      ),
  };
}
