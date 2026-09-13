import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  getAvailableWorkspaceActions,
} from "../../../application/workspace/runtime/getAvailableWorkspaceActions";

export const devicesWorkspaceAdapter = {
  select() {
    selectWorkspaceDomain(
      "devices",
    );
  },

  actions() {
    return getAvailableWorkspaceActions(
      "devices",
    );
  },

  domain:
    "devices",
};
