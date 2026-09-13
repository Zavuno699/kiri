import {
  listStatesByDomain,
} from "../registry/stateRegistry";

import {
  listTransitionsByDomain,
} from "../registry/transitionRegistry";

export function getSecurityStateMachineDefinition() {
  return {
    states:
      listStatesByDomain(
        "security",
      ),
    transitions:
      listTransitionsByDomain(
        "security",
      ),
  };
}
