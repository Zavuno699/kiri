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

export function getLeasesObservability() {
  return {
    audit:
      selectAuditTimeline(
        "leases",
      ),
    telemetry:
      selectTelemetry(
        "leases",
      ),
    health:
      selectHealthSignals(
        "leases",
      ),
    anomalies:
      selectAnomalies(
        "leases",
      ),
  };
}
