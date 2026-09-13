export interface SecurityCommandController {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}

export function createSecurityCommandController(
  dispatch: (
    type: string,
    payload?: unknown,
  ) => Promise<unknown>,
): SecurityCommandController {
  return {
    dispatch,
  }
}
