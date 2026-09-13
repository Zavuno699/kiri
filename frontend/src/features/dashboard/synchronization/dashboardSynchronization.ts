export interface DashboardSynchronization {
  synchronize(id: string): Promise<void>
}

export function createDashboardSynchronization(
  sync: (id: string) => Promise<unknown>,
): DashboardSynchronization {
  return {
    async synchronize(id) {
      await sync(id)
    },
  }
}
