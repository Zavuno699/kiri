import {
  registerCanonicalDomainPages,
} from "../registry/registerDomainPages";

import {
  registerCanonicalPageActions,
} from "../registry/registerPageActions";

import {
  registerPageRuntime,
} from "../state/pageRuntimeStore";

export function initializeUiRuntime(): void {
  registerCanonicalDomainPages();
  registerCanonicalPageActions();

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
    registerPageRuntime({
      domain,
      status:
        "idle",
      lastLoadedAt:
        null,
      lastUpdatedAt:
        null,
      error:
        null,
    });
  }
}
