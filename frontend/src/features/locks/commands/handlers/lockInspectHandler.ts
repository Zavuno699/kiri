export interface LockInspectHandler {
  execute(id: string): Promise<unknown>
}

export function createLockInspectHandler(
  inspect: (id: string) => Promise<unknown>,
): LockInspectHandler {
  return {
    execute: inspect,
  }
}
