export interface DashboardListLoader {
  load(
    query?: unknown,
  ): Promise<unknown[]>
}

export function createDashboardListLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
): DashboardListLoader {
  return {
    load,
  }
}
