export interface SecurityQueryClient {
  list(
    query?: unknown,
  ): Promise<unknown[]>

  detail(
    id: string,
  ): Promise<unknown>
}

export function createSecurityQueryClient(
  list: (
    query?: unknown,
  ) => Promise<unknown[]>,
  detail: (
    id: string,
  ) => Promise<unknown>,
): SecurityQueryClient {
  return {
    list,
    detail,
  }
}
