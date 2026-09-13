import {
  registerCanonicalDomainRuntimes,
} from "../registry/registerDomainRuntimes";

import {
  registerCanonicalDomainDependencies,
} from "../registry/registerDomainDependencies";

import {
  registerDomainRuntime,
} from "../state/domainRuntimeStore";

export function initializeDomainRuntimes(): void {
  registerCanonicalDomainRuntimes();
  registerCanonicalDomainDependencies();

  for (
    const domain of [
      "dashboard",
      "properties",
      "leases",
      "payments",
      "devices",
      "locks",
      "security",
    ]
  ) {
    registerDomainRuntime({
      domain,
      initialized: true,
      ready: true,
      degraded: false,
      lastTransitionAt:
        new Date().toISOString(),
      reason: null,
    });
  }
}
