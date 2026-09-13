export interface DeviceListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function createDeviceListHandler(
  query: (params?: unknown) => Promise<unknown>,
): DeviceListHandler {
  return {
    execute: query,
  }
}
