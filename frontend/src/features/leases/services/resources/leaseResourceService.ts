export interface LeaseResourceService {
  list(
    params?: unknown,
  ): Promise<unknown[]>

  get(
    id: string,
  ): Promise<unknown>
}

export function createLeaseResourceService(
  list: (
    params?: unknown,
  ) => Promise<unknown[]>,
  get: (
    id: string,
  ) => Promise<unknown>,
): LeaseResourceService {
  return {
    list,
    get,
  }
}
