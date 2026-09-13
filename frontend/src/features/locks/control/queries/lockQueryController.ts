export interface LockQueryController {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}

export function createLockQueryController(
  execute: (
    type: string,
    params?: unknown,
  ) => Promise<unknown>,
): LockQueryController {
  return {
    execute,
  }
}
