export interface LeaseDetailPageLoader {
  load(
    id: string,
  ): Promise<unknown>
}

export function createLeaseDetailPageLoader(
  load: (
    id: string,
  ) => Promise<unknown>,
): LeaseDetailPageLoader {
  return {
    load,
  }
}
