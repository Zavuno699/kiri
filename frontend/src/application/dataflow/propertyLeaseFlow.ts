export interface PropertyLeaseFlow {
  propertyId: string
  leaseIds: string[]
}

export function createPropertyLeaseFlow(
  propertyId: string,
  leaseIds: string[],
): PropertyLeaseFlow {
  return {
    propertyId,
    leaseIds: [...leaseIds],
  }
}
