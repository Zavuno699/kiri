export interface DeviceFacade {
  get(id: string): Promise<unknown>
  command(input: unknown): Promise<unknown>
}

export function createDeviceFacade(
  get: (id: string) => Promise<unknown>,
  command: (input: unknown) => Promise<unknown>,
): DeviceFacade {
  return { get, command }
}
