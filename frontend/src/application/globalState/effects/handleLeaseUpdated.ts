import {
  registerGlobalEventHandler,
} from "../registry/globalEventRegistry";

import {
  markResourceStale,
} from "../../projections/runtime/resourceTransitions";

registerGlobalEventHandler(
  "lease.updated",
  () => {
    markResourceStale(
      "dashboard",
    );

    markResourceStale(
      "devices",
    );

    markResourceStale(
      "locks",
    );
  },
);
