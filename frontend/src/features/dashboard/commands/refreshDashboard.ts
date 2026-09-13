export interface RefreshDashboardCommand {
  reason: string
}

export function createRefreshDashboardCommand(
  reason: string,
): RefreshDashboardCommand {
  return {
    reason: reason.trim(),
  }
}
