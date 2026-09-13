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

export function getLocksObservability() {
  return {
    audit:
      selectAuditTimeline(
        "locks",
      ),
    telemetry:
      selectTelemetry(
        "locks",
      ),
    health:
      selectHealthSignals(
        "locks",
      ),
    anomalies:
      selectAnomalies(
        "locks",
      ),
  };
}
