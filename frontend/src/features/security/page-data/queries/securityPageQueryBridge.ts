export interface SecurityPageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
