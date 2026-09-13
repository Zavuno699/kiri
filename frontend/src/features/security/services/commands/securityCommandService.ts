export interface SecurityCommandService {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createSecurityCommandService(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): SecurityCommandService {
  return {
    execute,
  }
}
