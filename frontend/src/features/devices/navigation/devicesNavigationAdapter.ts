import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  startRoute,
} from "../../../application/navigation/runtime/startRoute";

export const devicesNavigationAdapter = {
  select() {
    selectWorkspaceDomain(
      "devices",
    );

    startRoute(
      false
        ? "/"
        : "/devices",
    );
  },

  domain:
    "devices",
};
