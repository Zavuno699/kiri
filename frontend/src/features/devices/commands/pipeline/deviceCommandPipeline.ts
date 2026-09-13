export interface DeviceCommandPipeline {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createDeviceCommandPipeline(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): DeviceCommandPipeline {
  return {
    execute,
  }
}
