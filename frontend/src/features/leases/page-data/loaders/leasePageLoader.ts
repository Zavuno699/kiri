export interface LeasePageLoader {
  load(
    query?: unknown,
  ): Promise<unknown>
}

export function createLeasePageLoader(
  load: (
    query?: unknown,
  ) => Promise<unknown>,
): LeasePageLoader {
  return {
    load,
  }
}
