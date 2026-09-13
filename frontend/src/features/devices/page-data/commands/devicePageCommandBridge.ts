export interface DevicePageCommandBridge {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}
