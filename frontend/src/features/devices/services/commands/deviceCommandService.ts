export interface DeviceCommandService {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createDeviceCommandService(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): DeviceCommandService {
  return {
    execute,
  }
}
