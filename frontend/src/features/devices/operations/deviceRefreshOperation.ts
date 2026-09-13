export interface DeviceRefreshOperation {
  execute(): Promise<void>
}

export function createDeviceRefreshOperation(
  refresh: () => Promise<unknown>,
): DeviceRefreshOperation {
  return {
    async execute() {
      await refresh()
    },
  }
}
