import type {
  AnomalyRecord,
} from "../contracts/anomalyRecord";

const anomalies: AnomalyRecord[] = [];

export function appendAnomaly(
  anomaly: AnomalyRecord,
): void {
  anomalies.unshift(
    anomaly,
  );
}

export function listAnomalies(): AnomalyRecord[] {
  return [
    ...anomalies,
  ];
}

export function listOpenAnomalies(): AnomalyRecord[] {
  return anomalies.filter(
    (anomaly) =>
      !anomaly.resolved,
  );
}

export function resolveAnomaly(
  id: string,
): boolean {
  const anomaly =
    anomalies.find(
      (item) =>
        item.id ===
        id,
    );

  if (!anomaly) {
    return false;
  }

  anomaly.resolved =
    true;

  return true;
}
