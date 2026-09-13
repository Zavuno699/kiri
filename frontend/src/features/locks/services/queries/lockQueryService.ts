export interface LockQueryService {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createLockQueryService(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): LockQueryService {
  return {
    execute,
  }
}
