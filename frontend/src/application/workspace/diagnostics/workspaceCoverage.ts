import {
  listWorkspaceDomains,
} from "../registry/workspaceDomainRegistry";

import {
  listWorkspaceActionDomains,
} from "../registry/workspaceActionRegistry";

export function getWorkspaceCoverage() {
  return {
    domains:
      listWorkspaceDomains()
        .length,

    actionDomains:
      listWorkspaceActionDomains()
        .length,

    complete:
      listWorkspaceDomains()
        .length === 7 &&
      listWorkspaceActionDomains()
        .length === 7,
  };
}
