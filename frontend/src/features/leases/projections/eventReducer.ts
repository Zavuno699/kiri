export interface LeaseProjectionState {
  active: number
  expired: number
  delinquent: number
}

export function reduceLeaseEvent(
  state: LeaseProjectionState,
  event: {
    type: string
  },
): LeaseProjectionState {
  return {
    ...state,
    active:
      event.type.includes("active")
        ? state.active + 1
        : state.active,
    expired:
      event.type.includes("expired")
        ? state.expired + 1
        : state.expired,
    delinquent:
      event.type.includes("delinquent")
        ? state.delinquent + 1
        : state.delinquent,
  }
}
