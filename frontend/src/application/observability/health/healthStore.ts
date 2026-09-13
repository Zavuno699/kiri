import type {
  HealthSignal,
} from "../contracts/healthSignal";

const signals = new Map<
  string,
  HealthSignal
>();

export function recordHealthSignal(
  signal: HealthSignal,
): void {
  signals.set(
    signal.id,
    signal,
  );
}

export function getHealthSignal(
  id: string,
): HealthSignal | null {
  return (
    signals.get(id) ??
    null
  );
}

export function listHealthSignals(): HealthSignal[] {
  return [
    ...signals.values(),
  ];
}

export function listHealthByDomain(
  domain: string,
): HealthSignal[] {
  return listHealthSignals().filter(
    (signal) =>
      signal.domain ===
      domain,
  );
}
