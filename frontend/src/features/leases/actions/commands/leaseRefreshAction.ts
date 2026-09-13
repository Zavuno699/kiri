export interface LeaseRefreshAction {
  leaseId?: string
}

export function createLeaseRefreshAction(
  leaseId?: string,
): LeaseRefreshAction {
  return {
    leaseId,
  }
}
