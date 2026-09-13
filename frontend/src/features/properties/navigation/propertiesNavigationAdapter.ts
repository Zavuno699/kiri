import {
  selectWorkspaceDomain,
} from "../../../application/workspace/runtime/selectWorkspaceDomain";

import {
  startRoute,
} from "../../../application/navigation/runtime/startRoute";

export const propertiesNavigationAdapter = {
  select() {
    selectWorkspaceDomain(
      "properties",
    );

    startRoute(
      false
        ? "/"
        : "/properties",
    );
  },

  domain:
    "properties",
};
