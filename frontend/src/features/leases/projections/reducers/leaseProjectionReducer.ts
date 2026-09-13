export interface LeaseProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reduceLeaseProjection(
  state: LeaseProjectionState,
  event: {
    type: string
  },
): LeaseProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
