export interface LockProjectionState {
  locked: number
  unlocked: number
  blocked: number
}

export function reduceLockEvent(
  state: LockProjectionState,
  event: {
    type: string
  },
): LockProjectionState {
  return {
    ...state,
    locked:
      event.type.includes("locked")
        ? state.locked + 1
        : state.locked,
    unlocked:
      event.type.includes("unlocked")
        ? state.unlocked + 1
        : state.unlocked,
    blocked:
      event.type.includes("blocked")
        ? state.blocked + 1
        : state.blocked,
  }
}
