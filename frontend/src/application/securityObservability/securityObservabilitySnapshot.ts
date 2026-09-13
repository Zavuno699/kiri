import {
  getAuditRuntimeSnapshot,
} from "../audit/runtime/auditRuntime";

import {
  getSecurityTelemetryState,
} from "../securityTelemetry/state/securityTelemetryStore";

import {
  getOperatorActivityState,
} from "../operatorActivity/state/operatorActivityStore";

export function getSecurityObservabilitySnapshot() {
  return {
    audit: getAuditRuntimeSnapshot(),
    telemetry: getSecurityTelemetryState(),
    activity: getOperatorActivityState(),
  };
}
