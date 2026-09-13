export interface DeviceOperations {
  load(deviceId: string): Promise<unknown>
  prepareCommand(deviceId: string, command: string): Promise<unknown>
}

export function createDeviceOperations(
  load: (id: string) => Promise<unknown>,
  prepareCommand: (
    id: string,
    command: string,
  ) => Promise<unknown>,
): DeviceOperations {
  return { load, prepareCommand }
}
