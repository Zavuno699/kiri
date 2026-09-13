import type { DashboardLiveEvent } from "../events/dashboardLiveEvent"

export interface DashboardLiveHandler {
  handle(
    event: DashboardLiveEvent,
  ): void
}

export function createDashboardLiveHandler(
  handle: (
    event: DashboardLiveEvent,
  ) => void,
): DashboardLiveHandler {
  return {
    handle,
  }
}
