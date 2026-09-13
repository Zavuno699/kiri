import type { DashboardEvent } from "../dashboardEvent"

export interface DashboardEventHandler {
  handle(event: DashboardEvent): Promise<void>
}

export function createDashboardEventHandler(
  execute: (
    event: DashboardEvent,
  ) => Promise<unknown>,
): DashboardEventHandler {
  return {
    async handle(event) {
      await execute(event)
    },
  }
}
