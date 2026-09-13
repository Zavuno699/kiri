export interface DeviceQueryClient {
  list(
    query?: unknown,
  ): Promise<unknown[]>

  detail(
    id: string,
  ): Promise<unknown>
}

export function createDeviceQueryClient(
  list: (
    query?: unknown,
  ) => Promise<unknown[]>,
  detail: (
    id: string,
  ) => Promise<unknown>,
): DeviceQueryClient {
  return {
    list,
    detail,
  }
}
