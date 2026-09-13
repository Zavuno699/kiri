export interface DevicePageLoader {
  load(
    query?: unknown,
  ): Promise<unknown>
}

export function createDevicePageLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): DevicePageLoader {
  return {
    load,
  }
}
