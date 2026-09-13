export interface DevicePageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
