export interface DeviceSynchronization {
  synchronize(id: string): Promise<void>
}

export function createDeviceSynchronization(
  sync: (id: string) => Promise<unknown>,
): DeviceSynchronization {
  return {
    async synchronize(id) {
      await sync(id)
    },
  }
}
