import type { SecurityState } from "../securityState"

export interface SecurityStateMachine {
  state: SecurityState
  transition(
    next: SecurityState,
  ): SecurityState
}

export function createSecurityStateMachine():
  SecurityStateMachine {
  let state: SecurityState = "unknown"

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
