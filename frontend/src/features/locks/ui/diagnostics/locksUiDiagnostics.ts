import {
  getLocksPageState,
} from "../state/locksPageState";

import {
  getLocksPageActions,
} from "../actions/getLocksPageActions";

export function getLocksUiDiagnostics() {
  return {
    domain:
      "locks",

    state:
      getLocksPageState(),

    actions:
      getLocksPageActions(),
  };
}
