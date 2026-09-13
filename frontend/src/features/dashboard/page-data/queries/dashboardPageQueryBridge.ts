export interface DashboardPageQueryBridge {
  execute(
    type: string,
    params?: unknown,
  ): Promise<unknown>
}
