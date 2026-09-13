import type { LockState } from "../lockState"

export interface LockStateMachine {
  state: LockState
  transition(
    next: LockState,
  ): LockState
}

export function createLockStateMachine():
  LockStateMachine {
  let state: LockState = "unknown"

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
