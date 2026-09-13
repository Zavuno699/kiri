export interface DashboardCommandPipeline {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createDashboardCommandPipeline(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): DashboardCommandPipeline {
  return {
    execute,
  }
}
