import type {
  StateDefinition,
} from "../contracts/stateDefinition";

const states = new Map<
  string,
  StateDefinition
>();

export function registerState(
  state: StateDefinition,
): void {
  states.set(
    state.id,
    state,
  );
}

export function getStateDefinition(
  id: string,
): StateDefinition | null {
  return (
    states.get(id) ??
    null
  );
}

export function listStates(): StateDefinition[] {
  return [
    ...states.values(),
  ];
}

export function listStatesByDomain(
  domain: string,
): StateDefinition[] {
  return listStates().filter(
    (state) =>
      state.domain ===
      domain,
  );
}
