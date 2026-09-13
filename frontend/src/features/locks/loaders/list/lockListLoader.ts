export interface LockListLoader {
  load(
    query?: unknown,
  ): Promise<unknown[]>
}

export function createLockListLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
): LockListLoader {
  return {
    load,
  }
}
