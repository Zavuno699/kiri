import {
  listHealthSignals,
} from "../health/healthStore";

export function selectHealthSignals(
  domain?: string,
) {
  return listHealthSignals().filter(
    (signal) =>
      !domain ||
      signal.domain ===
        domain,
  );
}
