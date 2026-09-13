import type { SecurityTelemetryEvent } from "../telemetryEvent";

export interface SecurityTelemetryState {
  initialized: boolean;
  events: SecurityTelemetryEvent[];
  lastUpdatedAt: string | null;
}
