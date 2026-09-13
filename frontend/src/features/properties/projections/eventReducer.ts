export interface PropertyProjectionState {
  active: number
  degraded: number
  occupancy: number
}

export function reducePropertyEvent(
  state: PropertyProjectionState,
  event: {
    type: string
    occupancy?: number
  },
): PropertyProjectionState {
  return {
    ...state,
    active:
      event.type.includes("active")
        ? state.active + 1
        : state.active,
    degraded:
      event.type.includes("degraded")
        ? state.degraded + 1
        : state.degraded,
    occupancy:
      event.occupancy ?? state.occupancy,
  }
}
