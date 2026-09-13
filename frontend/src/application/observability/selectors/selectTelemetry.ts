import {
  listTelemetry,
} from "../telemetry/telemetryStore";

export function selectTelemetry(
  domain?: string,
) {
  return listTelemetry().filter(
    (signal) =>
      !domain ||
      signal.domain ===
        domain,
  );
}
