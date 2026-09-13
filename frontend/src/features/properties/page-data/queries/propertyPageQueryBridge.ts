export interface PropertyPageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
