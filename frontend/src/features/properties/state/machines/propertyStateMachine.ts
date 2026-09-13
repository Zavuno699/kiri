import type { PropertyState } from "../propertyState"

export interface PropertyStateMachine {
  state: PropertyState
  transition(
    next: PropertyState,
  ): PropertyState
}

export function createPropertyStateMachine():
  PropertyStateMachine {
  let state: PropertyState = "unknown"

  return {
    get state() {
      return state
    },

    transition(next) {
      state = next
      return state
    },
  }
}
