import {
  registerGlobalEventHandler,
} from "../registry/globalEventRegistry";

import {
  markResourceStale,
} from "../../projections/runtime/resourceTransitions";

registerGlobalEventHandler(
  "security.updated",
  () => {
    markResourceStale(
      "dashboard",
    );

    markResourceStale(
      "security",
    );
  },
);
