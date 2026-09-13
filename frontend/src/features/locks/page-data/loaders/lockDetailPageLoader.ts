export interface LockDetailPageLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createLockDetailPageLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): LockDetailPageLoader {
  return {
    load,
  }
}
