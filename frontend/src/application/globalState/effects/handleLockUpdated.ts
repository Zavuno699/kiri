import {
  registerGlobalEventHandler,
} from "../registry/globalEventRegistry";

import {
  markResourceStale,
} from "../../projections/runtime/resourceTransitions";

registerGlobalEventHandler(
  "lock.updated",
  () => {
    markResourceStale(
      "dashboard",
    );

    markResourceStale(
      "locks",
    );
  },
);
