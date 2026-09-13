import type {
  QueryHandler,
} from "../../../handlers/canonical/contracts/queryHandler";

import {
  getUnifiedOperationalState,
} from "../../../operationalState/operationalStateStore";

export const getOperationalStateHandler:
  QueryHandler = {
    queryType:
      "operational-state.get",

    async execute() {
      return getUnifiedOperationalState();
    },
  };
