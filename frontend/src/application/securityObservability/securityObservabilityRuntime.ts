import {
  refreshSecurityTelemetry,
} from "../securityTelemetry/runtime/securityTelemetryRuntime";

import {
  refreshOperatorActivity,
} from "../operatorActivity/runtime/operatorActivityRuntime";

export function refreshSecurityObservability(): void {
  refreshSecurityTelemetry();
  refreshOperatorActivity();
}
