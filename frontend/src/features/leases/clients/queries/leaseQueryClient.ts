export interface LeaseQueryClient {
  list(
    query?: unknown,
  ): Promise<unknown[]>

  detail(
    id: string,
  ): Promise<unknown>
}

export function createLeaseQueryClient(
  list: (
    query?: unknown,
  ) => Promise<unknown[]>,
  detail: (
    id: string,
  ) => Promise<unknown>,
): LeaseQueryClient {
  return {
    list,
    detail,
  }
}
