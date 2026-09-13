export interface LockResourceService {
  list(
    params?: unknown,
  ): Promise<unknown[]>

  get(
    id: string,
  ): Promise<unknown>
}

export function createLockResourceService(
  list: (
    params?: unknown,
  ) => Promise<unknown[]>,
  get: (
    id: string,
  ) => Promise<unknown>,
): LockResourceService {
  return {
    list,
    get,
  }
}
