import {
  collectSecurityTelemetry,
} from "../collectors/securityTelemetryCollector";

import {
  setSecurityTelemetryState,
} from "../state/securityTelemetryStore";

export function refreshSecurityTelemetry(): void {
  setSecurityTelemetryState({
    initialized: true,
    events: collectSecurityTelemetry(),
    lastUpdatedAt: new Date().toISOString(),
  });
}
