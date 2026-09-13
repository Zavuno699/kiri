import {
  listStatesByDomain,
} from "../registry/stateRegistry";

import {
  listTransitionsByDomain,
} from "../registry/transitionRegistry";

export function getPropertiesStateMachineDefinition() {
  return {
    states:
      listStatesByDomain(
        "properties",
      ),
    transitions:
      listTransitionsByDomain(
        "properties",
      ),
  };
}
