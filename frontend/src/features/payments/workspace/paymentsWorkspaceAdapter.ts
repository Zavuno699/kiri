import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  getAvailableWorkspaceActions,
} from "../../../application/workspace/runtime/getAvailableWorkspaceActions";

export const paymentsWorkspaceAdapter = {
  select() {
    selectWorkspaceDomain(
      "payments",
    );
  },

  actions() {
    return getAvailableWorkspaceActions(
      "payments",
    );
  },

  domain:
    "payments",
};
