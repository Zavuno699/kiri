import {
  listStatesByDomain,
} from "../registry/stateRegistry";

import {
  listTransitionsByDomain,
} from "../registry/transitionRegistry";

export function getDevicesStateMachineDefinition() {
  return {
    states:
      listStatesByDomain(
        "devices",
      ),
    transitions:
      listTransitionsByDomain(
        "devices",
      ),
  };
}
