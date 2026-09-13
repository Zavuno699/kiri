export interface LockRefreshHandler {
  execute(): Promise<void>
}

export function createLockRefreshHandler(
  refresh: () => Promise<unknown>,
): LockRefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
