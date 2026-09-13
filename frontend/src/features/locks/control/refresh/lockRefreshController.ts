export interface LockRefreshController {
  refresh(
    reason?: string,
  ): Promise<void>
}

export function createLockRefreshController(
  refresh: () => Promise<unknown>,
): LockRefreshController {
  return {
    async refresh() {
      await refresh()
    },
  }
}
