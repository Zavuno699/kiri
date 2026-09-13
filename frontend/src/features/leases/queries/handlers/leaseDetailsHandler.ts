export interface LeaseDetailsHandler {
  execute(id: string): Promise<unknown>
}

export function createLeaseDetailsHandler(
  query: (id: string) => Promise<unknown>,
): LeaseDetailsHandler {
  return {
    execute: query,
  }
}
