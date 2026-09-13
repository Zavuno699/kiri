import {
  listStatesByDomain,
} from "../registry/stateRegistry";

import {
  listTransitionsByDomain,
} from "../registry/transitionRegistry";

export function getLeasesStateMachineDefinition() {
  return {
    states:
      listStatesByDomain(
        "leases",
      ),
    transitions:
      listTransitionsByDomain(
        "leases",
      ),
  };
}
