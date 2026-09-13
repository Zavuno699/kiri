import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  startRoute,
} from "../../../application/navigation/runtime/startRoute";

export const paymentsNavigationAdapter = {
  select() {
    selectWorkspaceDomain(
      "payments",
    );

    startRoute(
      false
        ? "/"
        : "/payments",
    );
  },

  domain:
    "payments",
};
