export interface DashboardProjectionState {
  status: string
  version: number
  updatedAt: string
}

export function reduceDashboardProjection(
  state: DashboardProjectionState,
  event: {
    type: string
  },
): DashboardProjectionState {
  return {
    ...state,
    status: event.type,
    version: state.version + 1,
    updatedAt: new Date().toISOString(),
  }
}
