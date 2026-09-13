export interface DashboardQueryController {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}

export function createDashboardQueryController(
  execute: (
    type: string,
    params?: unknown,
  ) => Promise<unknown>,
): DashboardQueryController {
  return {
    execute,
  }
}
