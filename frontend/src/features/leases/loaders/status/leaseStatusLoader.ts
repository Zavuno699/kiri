export interface LeaseStatusLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createLeaseStatusLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): LeaseStatusLoader {
  return {
    load,
  }
}
