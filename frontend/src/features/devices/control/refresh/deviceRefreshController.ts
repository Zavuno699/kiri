export interface DeviceRefreshController {
  refresh(
    reason?: string,
  ): Promise<void>
}

export function createDeviceRefreshController(
  refresh: () => Promise<unknown>,
): DeviceRefreshController {
  return {
    async refresh() {
      await refresh()
    },
  }
}
