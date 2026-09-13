export interface DashboardCommandController {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}

export function createDashboardCommandController(
  dispatch: (
    type: string,
    payload?: unknown,
  ) => Promise<unknown>,
): DashboardCommandController {
  return {
    dispatch,
  }
}
