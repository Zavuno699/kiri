export function resolveLeaseRelations(
  leaseId: string,
  propertyId?: string,
  paymentIds: string[] = [],
  deviceIds: string[] = [],
) {
  return {
    leaseId,
    propertyId,
    paymentIds: [...paymentIds],
    deviceIds: [...deviceIds],
  }
}
