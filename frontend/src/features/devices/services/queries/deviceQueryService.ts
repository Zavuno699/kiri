export interface DeviceQueryService {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createDeviceQueryService(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): DeviceQueryService {
  return {
    execute,
  }
}
