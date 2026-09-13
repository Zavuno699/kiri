import {
  registerGlobalEventHandler,
} from "../registry/globalEventRegistry";

import {
  markResourceStale,
} from "../../projections/runtime/resourceTransitions";

registerGlobalEventHandler(
  "payment.updated",
  () => {
    markResourceStale(
      "leases",
    );

    markResourceStale(
      "dashboard",
    );
  },
);
