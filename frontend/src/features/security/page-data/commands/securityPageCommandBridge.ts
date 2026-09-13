export interface SecurityPageCommandBridge {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}
