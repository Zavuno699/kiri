import type {
  DashboardLiveProjection,
} from "./projections/dashboardLiveProjection"

export function reduceDashboardLive(
  state: DashboardLiveProjection,
  event: {
    type: string
  },
): DashboardLiveProjection {
  return {
    ...state,
    degradedServices:
      event.type.includes("degraded")
        ? state.degradedServices + 1
        : state.degradedServices,
    criticalEvents:
      event.type.includes("critical")
        ? state.criticalEvents + 1
        : state.criticalEvents,
    recentEvents:
      state.recentEvents + 1,
    updatedAt:
      new Date().toISOString(),
  }
}
