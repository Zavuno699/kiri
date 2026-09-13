export interface DashboardRefreshOperation {
  execute(): Promise<void>
}

export function createDashboardRefreshOperation(
  refresh: () => Promise<unknown>,
): DashboardRefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
