export interface OperationalContext {
  propertyId?: string
  leaseId?: string
  paymentId?: string
  deviceId?: string
  lockId?: string
  subjectId?: string
}

export function mergeOperationalContext(
  base: OperationalContext,
  patch: OperationalContext,
): OperationalContext {
  return {
    ...base,
    ...patch,
  }
}
