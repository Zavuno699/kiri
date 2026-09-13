export interface LeaseCommandController {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}

export function createLeaseCommandController(
  dispatch: (
    type: string,
    payload?: unknown,
  ) => Promise<unknown>,
): LeaseCommandController {
  return {
    dispatch,
  }
}
