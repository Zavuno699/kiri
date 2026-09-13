import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  startRoute,
} from "../../../application/navigation/runtime/startRoute";

export const securityNavigationAdapter = {
  select() {
    selectWorkspaceDomain(
      "security",
    );

    startRoute(
      false
        ? "/"
        : "/security",
    );
  },

  domain:
    "security",
};
