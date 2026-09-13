export interface DeviceQueryController {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}

export function createDeviceQueryController(
  execute: (
    type: string,
    params?: unknown,
  ) => Promise<unknown>,
): DeviceQueryController {
  return {
    execute,
  }
}
