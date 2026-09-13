export interface LockPageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
