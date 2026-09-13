import {
  listStatesByDomain,
} from "../registry/stateRegistry";

import {
  listTransitionsByDomain,
} from "../registry/transitionRegistry";

export function getDashboardStateMachineDefinition() {
  return {
    states:
      listStatesByDomain(
        "dashboard",
      ),
    transitions:
      listTransitionsByDomain(
        "dashboard",
      ),
  };
}
