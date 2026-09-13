import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  startRoute,
} from "../../../application/navigation/runtime/startRoute";

export const locksNavigationAdapter = {
  select() {
    selectWorkspaceDomain(
      "locks",
    );

    startRoute(
      false
        ? "/"
        : "/locks",
    );
  },

  domain:
    "locks",
};
