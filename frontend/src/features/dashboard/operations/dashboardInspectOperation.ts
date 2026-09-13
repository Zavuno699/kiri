export interface DashboardInspectOperation {
  execute(id: string): Promise<unknown>
}

export function createDashboardInspectOperation(
  inspect: (id: string) => Promise<unknown>,
): DashboardInspectOperation {
  return {
    execute: inspect,
  }
}
