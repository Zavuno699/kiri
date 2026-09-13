export interface LeasePageCommandBridge {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}
