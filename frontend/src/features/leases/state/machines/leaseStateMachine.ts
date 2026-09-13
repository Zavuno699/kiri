import type { LeaseState } from "../leaseState"

export interface LeaseStateMachine {
  state: LeaseState
  transition(
    next: LeaseState,
  ): LeaseState
}

export function createLeaseStateMachine():
  LeaseStateMachine {
  let state: LeaseState = "unknown"

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
