import type { DashboardCommandType } from "./dashboardCommandTypes"

export interface DashboardCommand {
  type: DashboardCommandType
  dashboardId?: string
}

export function createDashboardCommand(
  type: DashboardCommandType,
  dashboardId?: string,
): DashboardCommand {
  return {
    type,
    dashboardId,
  }
}
