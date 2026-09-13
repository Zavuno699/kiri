export interface LockCommandService {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createLockCommandService(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): LockCommandService {
  return {
    execute,
  }
}
