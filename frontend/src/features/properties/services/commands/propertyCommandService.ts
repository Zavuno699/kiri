export interface PropertyCommandService {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createPropertyCommandService(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): PropertyCommandService {
  return {
    execute,
  }
}
