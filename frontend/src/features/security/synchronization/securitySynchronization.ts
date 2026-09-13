export interface SecuritySynchronization {
  synchronize(id: string): Promise<void>
}

export function createSecuritySynchronization(
  sync: (id: string) => Promise<unknown>,
): SecuritySynchronization {
  return {
    async synchronize(id) {
      await sync(id)
    },
  }
}
