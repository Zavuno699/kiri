export interface DeviceApplication {
  get(id: string): Promise<unknown>
  executeCommand(
    input: unknown,
  ): Promise<unknown>
}
