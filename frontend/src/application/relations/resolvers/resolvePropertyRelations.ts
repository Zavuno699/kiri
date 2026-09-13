export function resolvePropertyRelations(
  propertyId: string,
  leaseIds: string[] = [],
  paymentIds: string[] = [],
  deviceIds: string[] = [],
) {
  return {
    propertyId,
    leaseIds: [...leaseIds],
    paymentIds: [...paymentIds],
    deviceIds: [...deviceIds],
  }
}
