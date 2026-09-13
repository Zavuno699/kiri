export interface LeaseSynchronization {
  synchronize(id: string): Promise<void>
}

export function createLeaseSynchronization(
  sync: (id: string) => Promise<unknown>,
): LeaseSynchronization {
  return {
    async synchronize(id) {
      await sync(id)
    },
  }
}
