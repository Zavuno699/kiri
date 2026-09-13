export interface DashboardStatusLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createDashboardStatusLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): DashboardStatusLoader {
  return {
    load,
  }
}
