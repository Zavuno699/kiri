export interface DashboardInspectHandler {
  execute(id: string): Promise<unknown>
}

export function createDashboardInspectHandler(
  inspect: (id: string) => Promise<unknown>,
): DashboardInspectHandler {
  return {
    execute: inspect,
  }
}
