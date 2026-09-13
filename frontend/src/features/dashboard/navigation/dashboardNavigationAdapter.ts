import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  startRoute,
} from "../../../application/navigation/runtime/startRoute";

export const dashboardNavigationAdapter = {
  select() {
    selectWorkspaceDomain(
      "dashboard",
    );

    startRoute(
      true
        ? "/"
        : "/dashboard",
    );
  },

  domain:
    "dashboard",
};
