export interface DeviceDetailLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createDeviceDetailLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): DeviceDetailLoader {
  return {
    load,
  }
}
