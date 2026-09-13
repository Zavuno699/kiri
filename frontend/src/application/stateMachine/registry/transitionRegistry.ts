import type {
  TransitionDefinition,
} from "../contracts/transitionDefinition";

const transitions = new Map<
  string,
  TransitionDefinition
>();

export function registerTransition(
  transition: TransitionDefinition,
): void {
  transitions.set(
    transition.id,
    transition,
  );
}

export function getTransition(
  id: string,
): TransitionDefinition | null {
  return (
    transitions.get(id) ??
    null
  );
}

export function listTransitions(): TransitionDefinition[] {
  return [
    ...transitions.values(),
  ];
}

export function listTransitionsByDomain(
  domain: string,
): TransitionDefinition[] {
  return listTransitions().filter(
    (transition) =>
      transition.domain ===
      domain,
  );
}

export function listTransitionsFromState(
  domain: string,
  state: string,
): TransitionDefinition[] {
  return listTransitionsByDomain(
    domain,
  ).filter(
    (transition) =>
      transition.fromStates.includes(
        state,
      ),
  );
}
