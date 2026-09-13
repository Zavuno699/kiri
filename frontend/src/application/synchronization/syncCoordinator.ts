export interface SyncCoordinator {
  sync(keys: string[]): Promise<void>
}

export function createSyncCoordinator(
  run: (key: string) => Promise<unknown>,
): SyncCoordinator {
  return {
    async sync(keys) {
      for (const key of keys) {
        await run(key)
      }
    },
  }
}
