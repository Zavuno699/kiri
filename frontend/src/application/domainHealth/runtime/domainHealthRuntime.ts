import {
  createDomainHealth,
} from "../checks/domainHealthCheck";

import {
  setDomainHealthState,
} from "../state/domainHealthStore";

const DOMAINS = [
  "dashboard",
  "properties",
  "leases",
  "payments",
  "devices",
  "locks",
  "security",
];

export function refreshDomainHealth(): void {
  const domains = DOMAINS.map(
    (domain) =>
      createDomainHealth(domain),
  );

  const score =
    domains.length === 0
      ? 0
      : Math.round(
          domains.reduce(
            (sum, item) => sum + item.score,
            0,
          ) / domains.length,
        );

  setDomainHealthState({
    initialized: true,
    domains,
    overall:
      domains.some(
        (item) =>
          item.status === "unavailable",
      )
        ? "failed"
        : domains.some(
              (item) =>
                item.status === "degraded",
            )
          ? "degraded"
          : "healthy",
    score,
  });
}
