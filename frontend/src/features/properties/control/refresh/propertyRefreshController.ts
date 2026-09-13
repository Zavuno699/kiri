export interface PropertyRefreshController {
  refresh(
    reason?: string,
  ): Promise<void>
}

export function createPropertyRefreshController(
  refresh: () => Promise<unknown>,
): PropertyRefreshController {
  return {
    async refresh() {
      await refresh()
    },
  }
}
