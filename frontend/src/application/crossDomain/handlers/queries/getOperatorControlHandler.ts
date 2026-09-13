import type {
  QueryHandler,
} from "../../../handlers/canonical/contracts/queryHandler";

import {
  getGlobalOperatorControlState,
} from "../../../operatorControl/state/globalOperatorControlStore";

export const getOperatorControlHandler:
  QueryHandler = {
    queryType:
      "operator-control.get",

    async execute() {
      return getGlobalOperatorControlState();
    },
  };
