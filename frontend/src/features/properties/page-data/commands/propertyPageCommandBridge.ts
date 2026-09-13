export interface PropertyPageCommandBridge {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}
