export interface FeatureAvailability {
  dashboard: boolean
  property: boolean
  lease: boolean
  payment: boolean
  device: boolean
  lock: boolean
  security: boolean
}

export const unavailableProductionFeatures = {
  deviceCollection: true,
  lockPublicIngress: true,
  securityPublicIngress: true,
} as const
