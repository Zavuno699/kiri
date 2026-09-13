export interface DashboardQueryPipeline {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createDashboardQueryPipeline(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): DashboardQueryPipeline {
  return {
    execute,
  }
}
