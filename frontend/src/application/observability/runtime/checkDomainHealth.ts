import {
  listHealthByDomain,
} from "../health/healthStore";

export function checkDomainHealth(
  domain: string,
) {
  const signals =
    listHealthByDomain(
      domain,
    );

  if (
    signals.some(
      (signal) =>
        signal.status ===
        "critical",
    )
  ) {
    return "critical" as const;
  }

  if (
    signals.some(
      (signal) =>
        signal.status ===
        "degraded",
    )
  ) {
    return "degraded" as const;
  }

  if (
    signals.length ===
    0
  ) {
    return "unknown" as const;
  }

  return "healthy" as const;
}
