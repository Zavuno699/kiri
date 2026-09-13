import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  startRoute,
} from "../../../application/navigation/runtime/startRoute";

export const leasesNavigationAdapter = {
  select() {
    selectWorkspaceDomain(
      "leases",
    );

    startRoute(
      false
        ? "/"
        : "/leases",
    );
  },

  domain:
    "leases",
};
