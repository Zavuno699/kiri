export interface LockListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function createLockListHandler(
  query: (params?: unknown) => Promise<unknown>,
): LockListHandler {
  return {
    execute: query,
  }
}
