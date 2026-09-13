export interface DeviceInspectOperation {
  execute(id: string): Promise<unknown>
}

export function createDeviceInspectOperation(
  inspect: (id: string) => Promise<unknown>,
): DeviceInspectOperation {
  return {
    execute: inspect,
  }
}
