export interface LeaseListLoader {
  load(
    query?: unknown,
  ): Promise<unknown[]>
}

export function createLeaseListLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown[]>,
): LeaseListLoader {
  return {
    load,
  }
}
