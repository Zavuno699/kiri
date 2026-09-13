export interface LockCommandController {
  dispatch(
    type: string,
    payload?: unknown,
  ): Promise<unknown>
}

export function createLockCommandController(
  dispatch: (
    type: string,
    payload?: unknown,
  ) => Promise<unknown>,
): LockCommandController {
  return {
    dispatch,
  }
}
