import {
  recordTelemetry,
} from "../telemetry/telemetryStore";

export function recordLatencyTelemetry(input: {
  name: string;
  domain: string;
  value: number;
  metadata?: Record<
    string,
    unknown
  >;
}): void {
  recordTelemetry({
    id:
      `latency-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type:
      "latency",
    name:
      input.name,
    domain:
      input.domain,
    value:
      input.value,
    unit:
      "ms",
    severity:
      input.value >=
      1000
        ? "warning"
        : "info",
    recordedAt:
      new Date().toISOString(),
    metadata:
      input.metadata ??
      {},
  });
}
