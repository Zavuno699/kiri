export interface LockProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reduceLockProjection(
  state: LockProjectionState,
  event: {
    type: string
  },
): LockProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
