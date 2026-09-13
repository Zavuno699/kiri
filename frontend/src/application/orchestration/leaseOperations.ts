export interface LeaseOperations {
  load(leaseId: string): Promise<unknown>
  correlate(leaseId: string): Promise<unknown>
}

export function createLeaseOperations(
  load: (id: string) => Promise<unknown>,
  correlate: (id: string) => Promise<unknown>,
): LeaseOperations {
  return { load, correlate }
}
