import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  getAvailableWorkspaceActions,
} from "../../../application/workspace/runtime/getAvailableWorkspaceActions";

export const leasesWorkspaceAdapter = {
  select() {
    selectWorkspaceDomain(
      "leases",
    );
  },

  actions() {
    return getAvailableWorkspaceActions(
      "leases",
    );
  },

  domain:
    "leases",
};
