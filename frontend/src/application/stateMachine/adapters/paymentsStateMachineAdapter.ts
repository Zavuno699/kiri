import {
  listStatesByDomain,
} from "../registry/stateRegistry";

import {
  listTransitionsByDomain,
} from "../registry/transitionRegistry";

export function getPaymentsStateMachineDefinition() {
  return {
    states:
      listStatesByDomain(
        "payments",
      ),
    transitions:
      listTransitionsByDomain(
        "payments",
      ),
  };
}
