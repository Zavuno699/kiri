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

export function getPropertiesObservability() {
  return {
    audit:
      selectAuditTimeline(
        "properties",
      ),
    telemetry:
      selectTelemetry(
        "properties",
      ),
    health:
      selectHealthSignals(
        "properties",
      ),
    anomalies:
      selectAnomalies(
        "properties",
      ),
  };
}
