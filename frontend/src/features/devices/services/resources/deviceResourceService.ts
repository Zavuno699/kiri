export interface DeviceResourceService {
  list(
    params?: unknown,
  ): Promise<unknown[]>

  get(
    id: string,
  ): Promise<unknown>
}

export function createDeviceResourceService(
  list: (
    params?: unknown,
  ) => Promise<unknown[]>,
  get: (
    id: string,
  ) => Promise<unknown>,
): DeviceResourceService {
  return {
    list,
    get,
  }
}
