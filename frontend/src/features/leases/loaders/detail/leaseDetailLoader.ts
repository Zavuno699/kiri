export interface LeaseDetailLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createLeaseDetailLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): LeaseDetailLoader {
  return {
    load,
  }
}
