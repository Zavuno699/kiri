import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  getAvailableWorkspaceActions,
} from "../../../application/workspace/runtime/getAvailableWorkspaceActions";

export const propertiesWorkspaceAdapter = {
  select() {
    selectWorkspaceDomain(
      "properties",
    );
  },

  actions() {
    return getAvailableWorkspaceActions(
      "properties",
    );
  },

  domain:
    "properties",
};
