export interface LockSynchronization {
  synchronize(id: string): Promise<void>
}

export function createLockSynchronization(
  sync: (id: string) => Promise<unknown>,
): LockSynchronization {
  return {
    async synchronize(id) {
      await sync(id)
    },
  }
}
