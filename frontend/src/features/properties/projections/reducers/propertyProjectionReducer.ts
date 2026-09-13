export interface PropertyProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reducePropertyProjection(
  state: PropertyProjectionState,
  event: {
    type: string
  },
): PropertyProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
