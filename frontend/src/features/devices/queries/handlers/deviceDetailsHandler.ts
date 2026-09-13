export interface DeviceDetailsHandler {
  execute(id: string): Promise<unknown>
}

export function createDeviceDetailsHandler(
  query: (id: string) => Promise<unknown>,
): DeviceDetailsHandler {
  return {
    execute: query,
  }
}
