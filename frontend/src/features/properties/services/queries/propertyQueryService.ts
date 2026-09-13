export interface PropertyQueryService {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createPropertyQueryService(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): PropertyQueryService {
  return {
    execute,
  }
}
