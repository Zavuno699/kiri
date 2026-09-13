export interface SecurityRefreshController {
  refresh(
    reason?: string,
  ): Promise<void>
}

export function createSecurityRefreshController(
  refresh: () => Promise<unknown>,
): SecurityRefreshController {
  return {
    async refresh() {
      await refresh()
    },
  }
}
