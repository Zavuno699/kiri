export interface LockInspectOperation {
  execute(id: string): Promise<unknown>
}

export function createLockInspectOperation(
  inspect: (id: string) => Promise<unknown>,
): LockInspectOperation {
  return {
    execute: inspect,
  }
}
