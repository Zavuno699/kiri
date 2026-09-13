export interface LockCommandPipeline {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createLockCommandPipeline(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): LockCommandPipeline {
  return {
    execute,
  }
}
