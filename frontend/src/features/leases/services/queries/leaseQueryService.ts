export interface LeaseQueryService {
  execute(
    query: unknown,
  ): Promise<unknown>
}

export function createLeaseQueryService(
  execute: (
    query: unknown,
  ) => Promise<unknown>,
): LeaseQueryService {
  return {
    execute,
  }
}
