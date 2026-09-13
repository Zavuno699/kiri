import type {
  TelemetrySignal,
} from "../contracts/telemetrySignal";

const signals: TelemetrySignal[] = [];

export function recordTelemetry(
  signal: TelemetrySignal,
): void {
  signals.unshift(
    signal,
  );
}

export function listTelemetry(): TelemetrySignal[] {
  return [
    ...signals,
  ];
}

export function listTelemetryByDomain(
  domain: string,
): TelemetrySignal[] {
  return signals.filter(
    (signal) =>
      signal.domain ===
      domain,
  );
}
