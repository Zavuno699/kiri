export interface LockStatusLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createLockStatusLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): LockStatusLoader {
  return {
    load,
  }
}
