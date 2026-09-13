import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  getAvailableWorkspaceActions,
} from "../../../application/workspace/runtime/getAvailableWorkspaceActions";

export const securityWorkspaceAdapter = {
  select() {
    selectWorkspaceDomain(
      "security",
    );
  },

  actions() {
    return getAvailableWorkspaceActions(
      "security",
    );
  },

  domain:
    "security",
};
