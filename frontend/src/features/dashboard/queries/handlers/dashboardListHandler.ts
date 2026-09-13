export interface DashboardListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function createDashboardListHandler(
  query: (params?: unknown) => Promise<unknown>,
): DashboardListHandler {
  return {
    execute: query,
  }
}
