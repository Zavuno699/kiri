import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  getAvailableWorkspaceActions,
} from "../../../application/workspace/runtime/getAvailableWorkspaceActions";

export const dashboardWorkspaceAdapter = {
  select() {
    selectWorkspaceDomain(
      "dashboard",
    );
  },

  actions() {
    return getAvailableWorkspaceActions(
      "dashboard",
    );
  },

  domain:
    "dashboard",
};
