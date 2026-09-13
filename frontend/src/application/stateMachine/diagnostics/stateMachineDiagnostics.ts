import {
  listStates,
} from "../registry/stateRegistry";

import {
  listTransitions,
} from "../registry/transitionRegistry";

import {
  listGuards,
} from "../guards/guardRegistry";

import {
  listInvariants,
} from "../invariants/invariantRegistry";

import {
  listEntityStates,
} from "../state/entityStateStore";

import {
  listTransitionHistory,
} from "../history/transitionHistoryStore";

import {
  getStateMachineRuntime,
} from "../state/stateMachineRuntimeStore";

export function getStateMachineDiagnostics() {
  const history =
    listTransitionHistory();

  return {
    stateCount:
      listStates().length,

    transitionCount:
      listTransitions().length,

    guardCount:
      listGuards().length,

    invariantCount:
      listInvariants().length,

    entityStateCount:
      listEntityStates().length,

    historyCount:
      history.length,

    completedTransitions:
      history.filter(
        (entry) =>
          entry.outcome ===
          "completed",
      ).length,

    blockedTransitions:
      history.filter(
        (entry) =>
          entry.outcome ===
          "blocked",
      ).length,

    runtime:
      getStateMachineRuntime(),
  };
}
