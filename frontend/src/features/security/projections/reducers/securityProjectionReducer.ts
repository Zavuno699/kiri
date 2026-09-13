export interface SecurityProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reduceSecurityProjection(
  state: SecurityProjectionState,
  event: {
    type: string
  },
): SecurityProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
