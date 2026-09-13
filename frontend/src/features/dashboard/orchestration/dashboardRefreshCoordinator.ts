export interface DashboardRefreshCoordinator {
  refresh(): Promise<void>
}

export function createDashboardRefreshCoordinator(
  refreshers: Array<() => Promise<unknown>>,
): DashboardRefreshCoordinator {
  return {
    async refresh() {
      await Promise.allSettled(
        refreshers.map((refresh) => refresh()),
      )
    },
  }
}
