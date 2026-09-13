export interface LeasePageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
