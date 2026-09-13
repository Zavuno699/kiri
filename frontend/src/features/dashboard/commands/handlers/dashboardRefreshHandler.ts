export interface DashboardRefreshHandler {
  execute(): Promise<void>
}

export function createDashboardRefreshHandler(
  refresh: () => Promise<unknown>,
): DashboardRefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
