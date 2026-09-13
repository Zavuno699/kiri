export interface LeaseRefreshController {
  refresh(
    reason?: string,
  ): Promise<void>
}

export function createLeaseRefreshController(
  refresh: () => Promise<unknown>,
): LeaseRefreshController {
  return {
    async refresh() {
      await refresh()
    },
  }
}
