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

export function getDashboardObservability() {
  return {
    audit:
      selectAuditTimeline(
        "dashboard",
      ),
    telemetry:
      selectTelemetry(
        "dashboard",
      ),
    health:
      selectHealthSignals(
        "dashboard",
      ),
    anomalies:
      selectAnomalies(
        "dashboard",
      ),
  };
}
