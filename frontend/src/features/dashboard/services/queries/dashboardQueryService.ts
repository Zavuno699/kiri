export interface DashboardQueryService {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createDashboardQueryService(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): DashboardQueryService {
  return {
    execute,
  }
}
