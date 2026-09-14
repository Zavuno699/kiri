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
    const _domain of [
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
      pageId: _domain,
      ready: false,
      loading: false,
      stale: false,
      error: null,
    });
  }
}
