export interface QueryOrchestrator {
  execute(
    type: string,
    payload: unknown,
  ): Promise<unknown>
}

export function createQueryOrchestrator(
  execute: (
    type: string,
    payload: unknown,
  ) => Promise<unknown>,
): QueryOrchestrator {
  return { execute }
}
