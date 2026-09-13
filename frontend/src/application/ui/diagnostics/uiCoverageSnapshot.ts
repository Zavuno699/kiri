import {
  listDomainPages,
} from "../registry/domainPageRegistry";

import {
  listPageActionDomains,
} from "../registry/pageActionRegistry";

export function getUiCoverageSnapshot() {
  return {
    domainPages:
      listDomainPages().length,

    actionDomains:
      listPageActionDomains().length,

    converged:
      listDomainPages().length ===
      7 &&
      listPageActionDomains().length ===
      7,
  };
}
