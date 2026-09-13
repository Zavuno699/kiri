export interface LockPageLoader {
  load(
    query?: unknown,
  ): Promise<unknown>
}

export function createLockPageLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): LockPageLoader {
  return {
    load,
  }
}
