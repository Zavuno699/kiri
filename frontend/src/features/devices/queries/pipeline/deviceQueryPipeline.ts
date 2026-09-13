export interface DeviceQueryPipeline {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createDeviceQueryPipeline(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): DeviceQueryPipeline {
  return {
    execute,
  }
}
