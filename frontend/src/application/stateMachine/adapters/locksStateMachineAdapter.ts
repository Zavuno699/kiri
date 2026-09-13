import {
  listStatesByDomain,
} from "../registry/stateRegistry";

import {
  listTransitionsByDomain,
} from "../registry/transitionRegistry";

export function getLocksStateMachineDefinition() {
  return {
    states:
      listStatesByDomain(
        "locks",
      ),
    transitions:
      listTransitionsByDomain(
        "locks",
      ),
  };
}
