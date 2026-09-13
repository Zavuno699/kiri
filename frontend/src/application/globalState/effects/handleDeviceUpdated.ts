import {
  registerGlobalEventHandler,
} from "../registry/globalEventRegistry";

import {
  markResourceStale,
} from "../../projections/runtime/resourceTransitions";

registerGlobalEventHandler(
  "device.updated",
  () => {
    markResourceStale(
      "dashboard",
    );

    markResourceStale(
      "devices",
    );
  },
);
