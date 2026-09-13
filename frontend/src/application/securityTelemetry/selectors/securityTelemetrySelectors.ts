import type { SecurityTelemetryState } from "../state/securityTelemetryState";

export const selectSecurityTelemetryEvents = (
  state: SecurityTelemetryState,
) => state.events;

export const selectSecurityTelemetryReady = (
  state: SecurityTelemetryState,
) => state.initialized;
