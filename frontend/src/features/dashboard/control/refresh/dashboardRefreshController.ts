export interface DashboardRefreshController {
  refresh(
    reason?: string,
  ): Promise<void>
}

export function createDashboardRefreshController(
  refresh: () => Promise<unknown>,
): DashboardRefreshController {
  return {
    async refresh() {
      await refresh()
    },
  }
}
