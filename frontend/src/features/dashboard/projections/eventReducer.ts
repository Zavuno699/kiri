export interface DashboardProjectionState {
  healthy: number
  degraded: number
  critical: number
  events: number
}

export function reduceDashboardEvent(
  state: DashboardProjectionState,
  event: {
    type: string
  },
): DashboardProjectionState {
  return {
    ...state,
    events: state.events + 1,
    degraded:
      event.type.includes("degraded")
        ? state.degraded + 1
        : state.degraded,
    critical:
      event.type.includes("critical")
        ? state.critical + 1
        : state.critical,
  }
}
