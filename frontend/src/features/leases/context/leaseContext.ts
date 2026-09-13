export interface LeaseContext {
  domain: "leases"
  entityId?: string
  correlationId?: string
  readOnly: boolean
}

export function createLeaseContext(
  entityId?: string,
): LeaseContext {
  return {
    domain: "leases",
    entityId,
    readOnly: true,
  }
}
