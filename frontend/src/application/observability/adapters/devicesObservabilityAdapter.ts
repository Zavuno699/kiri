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

export function getDevicesObservability() {
  return {
    audit:
      selectAuditTimeline(
        "devices",
      ),
    telemetry:
      selectTelemetry(
        "devices",
      ),
    health:
      selectHealthSignals(
        "devices",
      ),
    anomalies:
      selectAnomalies(
        "devices",
      ),
  };
}
