export interface LockQueryPipeline {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createLockQueryPipeline(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): LockQueryPipeline {
  return {
    execute,
  }
}
