export interface DashboardCommandService {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createDashboardCommandService(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): DashboardCommandService {
  return {
    execute,
  }
}
