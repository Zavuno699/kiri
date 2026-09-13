import type { SecurityTelemetryState } from "./securityTelemetryState";

let state: SecurityTelemetryState = {
  initialized: false,
  events: [],
  lastUpdatedAt: null,
};

export function getSecurityTelemetryState(): SecurityTelemetryState {
  return state;
}

export function setSecurityTelemetryState(
  next: SecurityTelemetryState,
): void {
  state = next;
}
