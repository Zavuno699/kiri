export interface LockRefreshOperation {
  execute(): Promise<void>
}

export function createLockRefreshOperation(
  refresh: () => Promise<unknown>,
): LockRefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
