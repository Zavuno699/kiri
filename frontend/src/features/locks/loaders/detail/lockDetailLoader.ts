export interface LockDetailLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createLockDetailLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): LockDetailLoader {
  return {
    load,
  }
}
