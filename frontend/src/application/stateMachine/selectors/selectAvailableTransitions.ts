import {
  listTransitionsFromState,
} from "../registry/transitionRegistry";

export function selectAvailableTransitions(
  domain: string,
  state: string,
) {
  return listTransitionsFromState(
    domain,
    state,
  );
}
