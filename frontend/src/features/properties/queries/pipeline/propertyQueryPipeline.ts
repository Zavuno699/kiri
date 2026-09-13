export interface PropertyQueryPipeline {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createPropertyQueryPipeline(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): PropertyQueryPipeline {
  return {
    execute,
  }
}
