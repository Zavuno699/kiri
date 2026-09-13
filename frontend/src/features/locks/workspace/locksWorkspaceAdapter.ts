import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  getAvailableWorkspaceActions,
} from "../../../application/workspace/runtime/getAvailableWorkspaceActions";

export const locksWorkspaceAdapter = {
  select() {
    selectWorkspaceDomain(
      "locks",
    );
  },

  actions() {
    return getAvailableWorkspaceActions(
      "locks",
    );
  },

  domain:
    "locks",
};
