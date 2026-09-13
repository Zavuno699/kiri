export interface DeviceInspectHandler {
  execute(id: string): Promise<unknown>
}

export function createDeviceInspectHandler(
  inspect: (id: string) => Promise<unknown>,
): DeviceInspectHandler {
  return {
    execute: inspect,
  }
}
