import type {
  TelemetryEvent,
} from "./telemetryEvent"

export interface TelemetryBoundary {
  record(event: TelemetryEvent): void
}

export const noOpTelemetry:
  TelemetryBoundary = {
    record() {
      // Intentionally empty.
    },
  }
