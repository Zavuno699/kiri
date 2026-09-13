export interface LeaseQueryPipeline {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createLeaseQueryPipeline(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): LeaseQueryPipeline {
  return {
    execute,
  }
}
