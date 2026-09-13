export interface DashboardDetailLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createDashboardDetailLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): DashboardDetailLoader {
  return {
    load,
  }
}
