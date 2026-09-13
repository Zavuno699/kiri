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

export function getSecurityObservability() {
  return {
    audit:
      selectAuditTimeline(
        "security",
      ),
    telemetry:
      selectTelemetry(
        "security",
      ),
    health:
      selectHealthSignals(
        "security",
      ),
    anomalies:
      selectAnomalies(
        "security",
      ),
  };
}
