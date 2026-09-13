export interface DeviceDetailPageLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createDeviceDetailPageLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): DeviceDetailPageLoader {
  return {
    load,
  }
}
