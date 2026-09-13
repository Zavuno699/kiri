export interface SecurityQueryService {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createSecurityQueryService(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): SecurityQueryService {
  return {
    execute,
  }
}
