import {
  listAnomalies,
} from "../anomalies/anomalyStore";

export function selectAnomalies(
  domain?: string,
) {
  return listAnomalies().filter(
    (anomaly) =>
      !domain ||
      anomaly.domain ===
        domain,
  );
}
