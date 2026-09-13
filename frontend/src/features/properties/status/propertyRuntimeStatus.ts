export interface PropertyRuntimeStatus {
  available: boolean
  degraded: boolean
  reason?: string
}

export const propertyRuntimeStatus: PropertyRuntimeStatus = {
  available: true,
  degraded: false,
}
