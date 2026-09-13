export interface DeviceRefreshHandler {
  execute(): Promise<void>
}

export function createDeviceRefreshHandler(
  refresh: () => Promise<unknown>,
): DeviceRefreshHandler {
  return {
    async execute() {
      await refresh()
    },
  }
}
