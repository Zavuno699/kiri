export interface SecurityQueryPipeline {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createSecurityQueryPipeline(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): SecurityQueryPipeline {
  return {
    execute,
  }
}
