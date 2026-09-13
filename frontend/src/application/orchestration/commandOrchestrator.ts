export interface CommandOrchestrator {
  dispatch(
    type: string,
    payload: unknown,
  ): Promise<unknown>
}

export function createCommandOrchestrator(
  dispatch: (
    type: string,
    payload: unknown,
  ) => Promise<unknown>,
): CommandOrchestrator {
  return { dispatch }
}
