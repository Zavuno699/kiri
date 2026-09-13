export interface LeaseListHandler {
  execute(params?: unknown): Promise<unknown>
}

export function createLeaseListHandler(
  query: (params?: unknown) => Promise<unknown>,
): LeaseListHandler {
  return {
    execute: query,
  }
}
