export interface LeaseCommandService {
  execute(
    command: unknown,
  ): Promise<unknown>
}

export function createLeaseCommandService(
  execute: (
    command: unknown,
  ) => Promise<unknown>,
): LeaseCommandService {
  return {
    execute,
  }
}
