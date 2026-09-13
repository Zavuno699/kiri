import {
  recordTelemetry,
} from "../telemetry/telemetryStore";

export function recordStatusTelemetry(input: {
  name: string;
  domain: string;
  value: number;
  severity?:
    | "info"
    | "warning"
    | "critical";
  metadata?: Record<
    string,
    unknown
  >;
}): void {
  recordTelemetry({
    id:
      `status-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type:
      "status",
    name:
      input.name,
    domain:
      input.domain,
    value:
      input.value,
    unit:
      "state",
    severity:
      input.severity ??
      "info",
    recordedAt:
      new Date().toISOString(),
    metadata:
      input.metadata ??
      {},
  });
}
