import {
  noOpTelemetry,
} from "./telemetryBoundary"

export function recordOperatorAction(
  action: string,
  entityType: string,
  entityId: string,
): void {
  noOpTelemetry.record({
    name: "operator.action",
    timestamp: new Date().toISOString(),
    attributes: {
      action,
      entityType,
      entityId,
    },
  })
}
