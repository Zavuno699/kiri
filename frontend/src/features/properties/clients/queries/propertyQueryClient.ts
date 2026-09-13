export interface PropertyQueryClient {
  list(
    query?: unknown,
  ): Promise<unknown[]>

  detail(
    id: string,
  ): Promise<unknown>
}

export function createPropertyQueryClient(
  list: (
    query?: unknown,
  ) => Promise<unknown[]>,
  detail: (
    id: string,
  ) => Promise<unknown>,
): PropertyQueryClient {
  return {
    list,
    detail,
  }
}
