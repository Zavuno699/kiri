export interface DashboardDetailPageLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createDashboardDetailPageLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): DashboardDetailPageLoader {
  return {
    load,
  }
}
