import type { StateTransition } from "../core/stateTransition"

export function applyTransition<S, E>(
  transition: StateTransition<S, E>,
  state: S,
  event: E,
): S {
  if (transition.from !== state) {
    return state
  }

  if (
    transition.guard &&
    !transition.guard(event)
  ) {
    return state
  }

  return transition.to
}
