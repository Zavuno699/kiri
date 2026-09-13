export interface LockDetailsHandler {
  execute(id: string): Promise<unknown>
}

export function createLockDetailsHandler(
  query: (id: string) => Promise<unknown>,
): LockDetailsHandler {
  return {
    execute: query,
  }
}
