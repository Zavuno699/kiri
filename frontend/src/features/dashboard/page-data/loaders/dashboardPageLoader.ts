export interface DashboardPageLoader {
  load(
    query?: unknown,
  ): Promise<unknown>
}

export function createDashboardPageLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): DashboardPageLoader {
  return {
    load,
  }
}
