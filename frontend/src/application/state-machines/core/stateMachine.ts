export interface StateMachine<S, E> {
  state: S
  transition(event: E): S
}

export function createStateMachine<S, E>(
  initial: S,
  reducer: (state: S, event: E) => S,
): StateMachine<S, E> {
  let state = initial

  return {
    get state() {
      return state
    },

    transition(event) {
      state = reducer(state, event)
      return state
    },
  }
}
