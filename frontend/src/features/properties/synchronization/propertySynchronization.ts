export interface PropertySynchronization {
  synchronize(id: string): Promise<void>
}

export function createPropertySynchronization(
  sync: (id: string) => Promise<unknown>,
): PropertySynchronization {
  return {
    async synchronize(id) {
      await sync(id)
    },
  }
}
