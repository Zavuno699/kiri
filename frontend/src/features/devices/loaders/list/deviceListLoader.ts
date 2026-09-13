export interface DeviceListLoader {
  load(
    query?: unknown,
  ): Promise<unknown[]>
}

export function createDeviceListLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
): DeviceListLoader {
  return {
    load,
  }
}
