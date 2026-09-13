export interface SecurityProjectionState {
  granted: number
  denied: number
  restricted: number
}

export function reduceSecurityEvent(
  state: SecurityProjectionState,
  event: {
    type: string
  },
): SecurityProjectionState {
  return {
    ...state,
    granted:
      event.type.includes("granted")
        ? state.granted + 1
        : state.granted,
    denied:
      event.type.includes("denied")
        ? state.denied + 1
        : state.denied,
    restricted:
      event.type.includes("restricted")
        ? state.restricted + 1
        : state.restricted,
  }
}
