export interface DeviceStatusLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createDeviceStatusLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): DeviceStatusLoader {
  return {
    load,
  }
}
