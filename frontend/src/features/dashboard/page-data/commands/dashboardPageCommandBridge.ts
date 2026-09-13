export interface DashboardPageCommandBridge {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}
