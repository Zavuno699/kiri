import type { DashboardCommandType } from "./dashboardCommandTypes"

export function dashboardCommandAllowed(
  type: DashboardCommandType,
): boolean {
  return type === "refresh" || type === "inspect"
}
