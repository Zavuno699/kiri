export interface DashboardDetailsHandler {
  execute(id: string): Promise<unknown>
}

export function createDashboardDetailsHandler(
  query: (id: string) => Promise<unknown>,
): DashboardDetailsHandler {
  return {
    execute: query,
  }
}
