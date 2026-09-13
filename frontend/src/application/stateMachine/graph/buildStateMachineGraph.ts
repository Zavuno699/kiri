import {
  listStates,
} from "../registry/stateRegistry";

import {
  listTransitions,
} from "../registry/transitionRegistry";

export function buildStateMachineGraph(
  domain?: string,
) {
  const states =
    listStates().filter(
      (state) =>
        !domain ||
        state.domain ===
          domain,
    );

  const transitions =
    listTransitions().filter(
      (transition) =>
        !domain ||
        transition.domain ===
          domain,
    );

  return {
    nodes:
      states.map(
        (state) => ({
          id:
            state.id,
          domain:
            state.domain,
          label:
            state.label,
          initial:
            state.initial,
          terminal:
            state.terminal,
        }),
      ),

    edges:
      transitions.flatMap(
        (transition) =>
          transition.fromStates.map(
            (from) => ({
              id:
                `${transition.id}:${from}`,
              source:
                from,
              target:
                transition.toState,
              transitionId:
                transition.id,
              label:
                transition.label,
              reversible:
                transition.reversible,
            }),
          ),
      ),
  };
}
