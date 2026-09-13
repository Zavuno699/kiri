export interface DashboardResourceService {
  list(
    params?: unknown,
  ): Promise<unknown[]>

  get(
    id: string,
  ): Promise<unknown>
}

export function createDashboardResourceService(
  list: (
    params?: unknown,
  ) => Promise<unknown[]>,
  get: (
    id: string,
  ) => Promise<unknown>,
): DashboardResourceService {
  return {
    list,
    get,
  }
}
